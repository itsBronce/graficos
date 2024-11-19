const chartCanvas = document.getElementById("salesChart");
const salesForm = document.getElementById("salesForm");
const addDataButton = document.getElementById("addData");

let salesData = [];
let salesChart;

fetch("js/data.json")
  .then(response => response.json())
  .then(data => {
    salesData = data.data;
    renderChart();
  })
  .catch(error => console.error("Error al cargar los datos:", error));

function renderChart() {
  const labels = salesData.map(item => item.month);
  const data = salesData.map(item => item.sales);

  if (salesChart) salesChart.destroy();

  salesChart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Ventas por Mes",
        data: data,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top"
        }
      }
    }
  });
}

addDataButton.addEventListener("click", () => {
  const monthInput = document.getElementById("month").value.trim();
  const salesInput = parseInt(document.getElementById("sales").value);

  if (monthInput && !isNaN(salesInput)) {
    salesData.push({ month: monthInput, sales: salesInput });
    renderChart();
    salesForm.reset();
  } else {
    alert("Por favor, complete ambos campos con valores válidos.");
  }
  console.log("Botón presionado");
});

function resetData() {
    salesData = [];

    if (salesChart) {
        salesChart.destroy();
        salesChart = null;
    }

    const ctx = chartCanvas.getContext("2d");
    ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

    console.log("Datos y gráfico reseteados.");
}

document.getElementById("resetData").addEventListener("click", resetData);
