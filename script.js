const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

document.querySelectorAll(".fa-heart").forEach((btn, index) => {
    const productId = `product-${index}`;

    if (favorites.includes(productId)) {
        btn.classList.add("active");
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();

        if (favorites.includes(productId)) {
            const indexToRemove = favorites.indexOf(productId);
            favorites.splice(indexToRemove, 1);
            btn.classList.remove("active");
        } else {
            favorites.push(productId);
            btn.classList.add("active");
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    });
});

document.querySelectorAll(".fa-share").forEach((btn, index) => {
    btn.addEventListener("click", async (e) => {
        e.preventDefault();

        const productTitle = `Produto ${index + 1}`;
        const productUrl = `Produto ${index}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: productTitle,
                    text: `Confira este produto incrível: ${productTitle}`,
                    url: productUrl,
                });
                alert("Produto compartilhado com sucesso!");
            } catch (err) {
                console.error("Erro ao compartilhar:", err);
            }
        } else {
            alert("O recurso de compartilhamento não é suportado no seu navegador.");
        }
    });
});
