document.querySelectorAll(".myForm").forEach(form => {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const homeId = this.querySelector("input[name=homeId]").value;
    const heart = this.querySelector(".fa-heart");

    try {
      const res = await fetch(this.action, {
        method: this.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeId })
      });

      const data = await res.json();

      if (data.success) {
        // backend bolega favourite hua ya remove hua
        if (data.isFavourite===1) {
          heart.classList.add("text-red-500", "fa-solid");
          heart.classList.remove("fa-regular");
        } else {
          heart.classList.remove("text-red-500", "fa-solid");
          heart.classList.add("fa-regular");          
        }
      } else {
        console.warn("Failed to update favourite:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  });
});
