function toggleBar(bar) {
  // close any other open bar first
  document.querySelectorAll(".song-bar.expanded").forEach(function (b) {
    if (b !== bar) {
      b.classList.remove("expanded");
      b.querySelector(".controls").remove();
    }
  });

  // toggle this bar
  if (bar.classList.contains("expanded")) {
    bar.classList.remove("expanded");
    bar.querySelector(".controls").remove();
  } else {
    bar.classList.add("expanded");

    // build the controls inside the bar
    let controls = document.createElement("div");
    controls.className = "controls";
    controls.innerHTML = `
      <button onclick="event.stopPropagation()">⏮</button>
      <button onclick="event.stopPropagation()">▶</button>
      <button onclick="event.stopPropagation()">⏭</button>
      <button onclick="event.stopPropagation()">🔊</button>
    `;
    bar.appendChild(controls);
  }
}
