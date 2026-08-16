async function fetchOrders() {
  const response = await fetch("data/orders.json");

  if (!response.ok) {
    throw new Error("Failed to load orders.json");
  }

  const data = await response.json();

  return data.orders;
}

const STAGES = [
  "Processing",
  "Shipped",
  "In Transit",
  "Delivered"
];

function stageIndex(status) {
  return STAGES.indexOf(status);
}

function fmtDate(iso) {
  if (!iso) return "—";

  const d = new Date(iso + "T00:00:00");

  return d.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function routeTrackHTML(order) {
  if (order.status === "Cancelled") {
    return `
      <div class="route is-cancelled">
        ${STAGES.map((s, i) => `
          <div class="stage ${i === 0 ? "reached" : ""}">
            <div
              class="dot"
              style="${
                i === 0
                  ? "border-color:var(--red);background:var(--red);"
                  : ""
              }"
            ></div>
          </div>
        `).join("")}
      </div>

      <div class="cancel-note">
        Order was cancelled after being placed.
      </div>
    `;
  }

  const idx = stageIndex(order.status);

  const fillPct =
    idx <= 0
      ? 0
      : (idx / (STAGES.length - 1)) * 100;

  const isDone = order.status === "Delivered";

  return `
    <div class="route">

      <div
        class="route-fill ${isDone ? "done" : ""}"
        style="width:${fillPct}%"
      ></div>

      ${STAGES.map((s, i) => `
        <div
          class="stage
            ${i <= idx ? "reached" : ""}
            ${
              i === STAGES.length - 1 && isDone
                ? "final"
                : ""
            }"
        >
          <div class="dot"></div>

          <span class="stage-label">
            ${s}
          </span>
        </div>
      `).join("")}

    </div>
  `;
}

function cardHTML(order) {
  const statusClass = order.status.replace(/\s+/g, "");

  return `
    <div class="card">

      <div class="card-top">

        <div>
          <div class="order-id">
            ${order.order_id}
          </div>

          <div class="product">
            ${order.product}
          </div>

          <div class="customer">
            ${order.customer_name}
          </div>
        </div>

        <span class="pill ${statusClass}">
          ${order.status}
        </span>

      </div>

      ${routeTrackHTML(order)}

      <div class="meta-row">

        <span>
          Ordered ${fmtDate(order.order_date)}
        </span>

        <span>
          ${
            order.status === "Cancelled"
              ? "No delivery"
              : "Est. " + fmtDate(order.estimated_delivery)
          }
        </span>

      </div>

    </div>
  `;
}

function render(orders) {
  const list = document.getElementById("order-list");
  const count = document.getElementById("order-count");

  count.textContent = orders.length
    ? `${orders.length} order${orders.length === 1 ? "" : "s"}`
    : "";

  if (!orders.length) {
    list.innerHTML = `
      <div class="empty">
        No orders match that search.
      </div>
    `;

    return;
  }

  list.innerHTML = orders
    .map(cardHTML)
    .join("");
}

let allOrders = [];

async function init() {
  try {
    allOrders = await fetchOrders();

    render(allOrders);
  } catch (error) {
    console.error(error);

    document.getElementById("order-list").innerHTML = `
      <div class="empty">
        Unable to load orders.
      </div>
    `;
  }
}

document
  .getElementById("search")
  .addEventListener("input", (e) => {

    const q = e.target.value
      .trim()
      .toLowerCase();

    if (!q) {
      render(allOrders);
      return;
    }

    const filtered = allOrders.filter((order) =>
      order.order_id.toLowerCase().includes(q) ||
      order.customer_name.toLowerCase().includes(q)
    );

    render(filtered);
  });

init();
