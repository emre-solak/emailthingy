export default function handler(req, res) {
  res.status(200).json([
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
  ]);
}
