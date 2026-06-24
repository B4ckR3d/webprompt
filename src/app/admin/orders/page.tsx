"use client";

export default function OrdersPage() {
  const orders = [
    { id: "ORD-001", user: "john@example.com", items: 3, total: "$29.97", status: "completed", date: "2026-06-24" },
    { id: "ORD-002", user: "sarah@company.io", items: 1, total: "$49.99", status: "completed", date: "2026-06-24" },
    { id: "ORD-003", user: "mike@startup.co", items: 2, total: "$19.98", status: "processing", date: "2026-06-23" },
    { id: "ORD-004", user: "lisa@design.co", items: 1, total: "$49.99", status: "completed", date: "2026-06-23" },
    { id: "ORD-005", user: "alex@dev.io", items: 5, total: "$49.95", status: "pending", date: "2026-06-22" },
  ];

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h2 className="text-2xl font-bold text-[#1C1917]">Orders</h2>
        <p className="text-sm text-[#57534E] mt-1">View all customer orders</p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="font-mono text-sm font-medium">{order.id}</td>
                <td className="text-sm">{order.user}</td>
                <td className="text-sm">{order.items} items</td>
                <td className="font-medium">{order.total}</td>
                <td>
                  <span className={`badge ${
                    order.status === "completed" ? "badge-success" :
                    order.status === "processing" ? "badge-warning" :
                    "badge"
                  }`} style={order.status === "pending" ? {background: "#F5F5F4", color: "#57534E"} : {}}>
                    {order.status}
                  </span>
                </td>
                <td className="text-sm text-[#A8A29E]">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
