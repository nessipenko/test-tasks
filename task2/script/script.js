function addCards() {
    const container = document.querySelector('#cards-container');
    const originalCards = container.children[0];

    for (let i = 0; i < 17; i++) {
        const clonedCards = originalCards.cloneNode(true);
        container.appendChild(clonedCards);
    }
}
addCards()
document.addEventListener("DOMContentLoaded", function () {
    const pageLinks = document.querySelectorAll('.page-link:not(.page-arrows)');
    const prevPageLink = document.querySelector('.prev');
    const nextPageLink = document.querySelector('.next');

    let currentPage = 1;
    pageLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            if (!isNaN(parseInt(this.textContent))) {
                currentPage = parseInt(this.textContent);

                pageLinks.forEach(function (page) {
                    page.classList.remove('active');
                });
                this.classList.add('active');
                console.log('Выбрана страница:', currentPage);
            }
        });
    });

    prevPageLink.addEventListener('click', function (event) {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            updateActivePage();
        }
    });

    nextPageLink.addEventListener('click', function (event) {
        event.preventDefault();
        if (currentPage < 5) {
            currentPage++;
            updateActivePage();
        }
    });

    function updateActivePage() {
        pageLinks.forEach(function (page) {
            page.classList.remove('active');
            if (parseInt(page.textContent) === currentPage) {
                page.classList.add('active');
                console.log('Выбрана страница:', currentPage);
            }
        });
    }
});
