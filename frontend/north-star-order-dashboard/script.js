document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const lookupInput = document.getElementById("order-input");
  const lookupBtn = document.getElementById("lookup-btn");
  const directResultContainer = document.getElementById("direct-result");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const deflectionCountEl = document.getElementById("deflection-count");

  // Modals & Controls
  const liveMapModal = document.getElementById("map-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const refundModal = document.getElementById("refund-modal");
  const closeRefundModalBtn = document.getElementById("close-refund-modal");
  const refundReasonSelect = document.getElementById("refund-reason-select");
  const submitRefundBtn = document.getElementById("submit-refund-btn");
  const modalOrderIdEl = document.getElementById("modal-order-id");

  // State Tracking
  let deflectionCount = 0;
  let currentOrderId = null;

  // Extract 4-digit order number
  function extractOrderId(text) {
    const match = text.match(/\b\d{4}\b/);
    return match ? match[0] : null;
  }

  // Dynamic order details generator
  function getOrderDetails(orderId) {
    return {
      id: orderId,
      status: "In Transit",
      carrier: "FedEx Express",
      trackingNumber: `FX-9842-${orderId}`,
      eta: "Tuesday by 4:30 PM",
      location: "Regional Sorting Facility (In Hub)",
      items: "2x Wireless Noise-Canceling Headphones",
      badgeClass: "in-transit"
    };
  }

  // Render Status Card on Left Panel
  function renderStatusCard(order) {
    directResultContainer.innerHTML = `
      <div class="status-card">
        <header>
          <span>Order #${order.id}</span>
          <span class="badge ${order.badgeClass}">${order.status}</span>
        </header>
        <p><strong>Package Content:</strong> ${order.items}</p>
        <p><strong>Carrier:</strong> ${order.carrier} (${order.trackingNumber})</p>
        <p><strong>Estimated Arrival:</strong> ${order.eta}</p>
        <p><strong>Current Location:</strong> ${order.location}</p>
        
        <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 6px;">
          <button id="refund-btn" style="background: rgba(255,255,255,0.08); border: 1px solid var(--card-border); color: #f8fafc; font-size: 0.8rem; padding: 8px;">
            🔄 Request Return / Refund
          </button>
          <button id="human-support-btn" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; font-size: 0.8rem; padding: 8px;">
            👤 Speak to Human Agent
          </button>
          <button id="view-map-btn" style="margin-top: 4px; font-size: 0.8rem; padding: 8px;">
            🗺️ View Live Map
          </button>
        </div>
      </div>
    `;

    // Event listeners
    document.getElementById("view-map-btn").addEventListener("click", openMapModal);
    document.getElementById("human-support-btn").addEventListener("click", triggerHumanTransfer);
    document.getElementById("refund-btn").addEventListener("click", () => openRefundModal(order.id));
  }

  // Append Message to Chat Window
  function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv;
  }

  /* ==========================================================
     HUMAN AGENT REDIRECT ANIMATION & FLOW
     ========================================================== */
  function triggerHumanTransfer() {
    const orderRef = currentOrderId ? `Order #${currentOrderId}` : "your order";
    
    // 1. Initial Notification Message
    appendMessage(
      "bot",
      `Initiating transfer to live support for <strong>${orderRef}</strong>... Please hold on standard queue.`
    );

    // 2. Add Live Connecting Indicator
    setTimeout(() => {
      const statusMsg = appendMessage("bot", `⏳ <em>Connecting you to a representative... [Searching available agents]</em>`);

      // 3. Simulated Connection Success
      setTimeout(() => {
        statusMsg.querySelector(".message-content").innerHTML = `
          ✅ <strong>Connected to Support Agent (Sarah M.)</strong><br>
          <span style="font-size: 0.82rem; color: #94a3b8;">"Hi there! I have your details and full chat history regarding ${orderRef}. How can I assist you directly?"</span>
        `;
      }, 2500);

    }, 800);
  }

  /* ==========================================================
     RETURN / REFUND MODAL & PROCESSING FLOW
     ========================================================== */
  function openRefundModal(orderId) {
    modalOrderIdEl.textContent = `Order #${orderId}`;
    refundReasonSelect.value = "";
    refundModal.style.display = "flex";
  }

  function closeRefundModal() {
    refundModal.style.display = "none";
  }

  if (submitRefundBtn) {
    submitRefundBtn.addEventListener("click", () => {
      const selectedReason = refundReasonSelect.value;

      if (!selectedReason) {
        alert("Please choose a reason or select 'I don't have a specific reason' to continue.");
        return;
      }

      closeRefundModal();

      // Case A: User selected "No reason / Prefer human assistance"
      if (selectedReason === "no_reason") {
        appendMessage("user", `Requesting Return/Refund for Order #${currentOrderId} (No specific reason provided).`);
        setTimeout(() => {
          appendMessage("bot", `I understand! Since you'd prefer to handle this directly without picking a specific automated reason, let me connect you right away to a customer support specialist.`);
          triggerHumanTransfer();
        }, 500);
        return;
      }

      // Case B: Automated Refund Processing Flow
      const reasonText = refundReasonSelect.options[refundReasonSelect.selectedIndex].text;
      appendMessage("user", `I'd like to return Order #${currentOrderId}. Reason: "${reasonText}".`);

      setTimeout(() => {
        const processingMsg = appendMessage("bot", `⚙️ <strong>Processing Return Request...</strong><br><small style="color: #94a3b8;">Verifying order state & eligibility...</small>`);

        // Final Processing Confirmation
        setTimeout(() => {
          processingMsg.querySelector(".message-content").innerHTML = `
            🎉 <strong>Return Request Approved!</strong><br>
            Your prepaid return label for <strong>Order #${currentOrderId}</strong> has been generated and sent to your registered email address. Once scanned by ${getOrderDetails(currentOrderId).carrier}, your full refund will process within 3-5 business days.
          `;
        }, 2200);

      }, 600);
    });
  }

  /* ==========================================================
     CONVERSATIONAL BOT ENGINE
     ========================================================== */
  function handleChatMessage(queryText) {
    const textLower = queryText.toLowerCase();
    const newOrderId = extractOrderId(queryText);

    // 1. New Order Lookup
    if (newOrderId) {
      currentOrderId = newOrderId;
      const order = getOrderDetails(currentOrderId);
      renderStatusCard(order);

      deflectionCount++;
      if (deflectionCountEl) deflectionCountEl.textContent = `${deflectionCount} deflected`;

      return `Thanks! I've retrieved **Order #${order.id}** for you (${order.items}). It's currently on its way via **${order.carrier}** (ETA: **${order.eta}**). Everything is updated on your left panel—how can I help you with this package?`;
    }

    // 2. Follow-Up Questions with Active Order Context
    if (currentOrderId) {
      const order = getOrderDetails(currentOrderId);

      if (textLower.includes("human") || textLower.includes("agent") || textLower.includes("person") || textLower.includes("support")) {
        triggerHumanTransfer();
        return `Routing your chat log regarding Order #${order.id} to an agent...`;
      }

      if (textLower.includes("refund") || textLower.includes("return") || textLower.includes("money back")) {
        openRefundModal(order.id);
        return `I've opened the Return/Refund menu for Order #${order.id}. Please select a reason, or choose to speak directly to a live representative!`;
      }

      if (textLower.includes("when") || textLower.includes("eta") || textLower.includes("arrive") || textLower.includes("delivery")) {
        return `Order #${order.id} is moving on schedule and scheduled to land at your address by **${order.eta}**.`;
      }

      if (textLower.includes("where") || textLower.includes("location") || textLower.includes("track")) {
        return `Order #${order.id} was last scanned at **${order.location}**. Click **View Live Map** on the left to see the map!`;
      }

      return `I'm tracking Order #${order.id} for you! It's currently **${order.status}** via ${order.carrier}. Do you need help with tracking, returning the item, or speaking to an agent?`;
    }

    return `Hi! Please enter your 4-digit order number (e.g., 4092) so I can retrieve your shipment details and assist you!`;
  }

  // Search Button Events
  if (lookupBtn && lookupInput) {
    lookupBtn.addEventListener("click", () => {
      const value = lookupInput.value.trim();
      if (!value) return;

      const orderId = extractOrderId(value);
      if (orderId) {
        currentOrderId = orderId;
        const order = getOrderDetails(orderId);
        renderStatusCard(order);
        appendMessage("bot", `I've retrieved Order #${order.id} on your left panel. How can I assist you with this shipment?`);
      } else {
        directResultContainer.innerHTML = `<div class="status-card" style="border-color: #ef4444; color: #ef4444;">Please enter a valid 4-digit order number.</div>`;
      }
    });

    lookupInput.addEventListener("keypress", (e) => { if (e.key === "Enter") lookupBtn.click(); });
  }

  // Chat Submission Events
  function processChatInput() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    appendMessage("user", userText);
    chatInput.value = "";

    setTimeout(() => {
      const botResponse = handleChatMessage(userText);
      if (botResponse) appendMessage("bot", botResponse);
    }, 400);
  }

  if (sendBtn && chatInput) {
    sendBtn.addEventListener("click", processChatInput);
    chatInput.addEventListener("keypress", (e) => { if (e.key === "Enter") processChatInput(); });
  }

  // Modal Close Handlers
  function openMapModal() { if (liveMapModal) liveMapModal.style.display = "flex"; }
  function closeMapModal() { if (liveMapModal) liveMapModal.style.display = "none"; }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeMapModal);
  if (closeRefundModalBtn) closeRefundModalBtn.addEventListener("click", closeRefundModal);

  window.addEventListener("click", (e) => {
    if (e.target === liveMapModal) closeMapModal();
    if (e.target === refundModal) closeRefundModal();
  });
});