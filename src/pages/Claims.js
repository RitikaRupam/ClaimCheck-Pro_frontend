import React, { useEffect, useState } from "react";
import { getClaims } from "../api";

function Claims() {
  const [claims, setClaims] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getClaims().then((res) => setClaims(res.data));
  }, []);

  const filteredClaims = claims.filter(
    (c) =>
      (search === "" ||
        c.claimId.toLowerCase().startsWith(search.toLowerCase())) &&
      (filter === "" || c.status === filter),
  );

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📋 Claims</h2>

      {/* Filters */}
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Search by Claim ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="REVIEW">Review</option>
        </select>
      </div>

      {/* Table */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Error</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.map((c) => (
            <tr key={c.claimId}>
              <td>{c.claimId}</td>
              <td>{c.status}</td>
              <td>{c.errorCode}</td>
              <td>{c.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Claims;
