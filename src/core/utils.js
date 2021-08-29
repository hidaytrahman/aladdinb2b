// set active color on selected category
export const setActiveCategory = (activeCategory) => {
    const $category = document.querySelectorAll(".category");
    for (let i = 0; i < $category.length; i++) {
        $category[i].classList.remove('selected');
    }
    activeCategory.classList.add('selected');
}