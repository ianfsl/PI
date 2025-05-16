const express = require("express");
const odbc = require("odbc");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const connectionString = "DSN=PousadaDB;";

// Criar reserva
app.post("/api/reservas", async (req, res) => {
  const { Quarto, Data_chek_In, Data_chek_Out } = req.body;

  try {
    const connection = await odbc.connect(connectionString);
    const query = `
      INSERT INTO Reserva (Quarto, Data_chek_In, Data_chek_Out)
      VALUES (?, ?, ?)
    `;
    await connection.query(query, [Quarto, Data_chek_In, Data_chek_Out]);
    res.json({ success: true, message: "Reserva salva!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar todas as reservas
app.get("/api/reservas", async (req, res) => {
  try {
    const connection = await odbc.connect(connectionString);
    const result = await connection.query("SELECT * FROM Reservas");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
