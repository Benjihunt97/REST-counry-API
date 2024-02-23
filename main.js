$(document).ready(() => {

    // toggle the theme button
    const themeBtn = $('.toggle-theme');
    const moon = $('#dark');
    const sun = $('#light');

    themeBtn.click((e) => {
        moon.toggleClass('-top-9');
        sun.toggleClass('bottom-1');
        $(e.currentTarget).toggleClass('bg-slate-900');
        $('.change').toggleClass('dark-theme');
        $('.change-btn').toggleClass('dark-theme-btn');
    });


    // show the filter item and add the animation to show them
    const regions = [
        'Africa',
        'America',
        'Asia',
        'Europe'
    ];

    regions.forEach((item, index) => {
        const regionItem = `
            <div class="p-3 hover:bg-gray-200 transition-all cursor-pointer">
                ${item}
            </div>
        `;

        $('.filter-display').append(regionItem);
    });

    $('#show-regions').click((e) => {
        $(e.currentTarget).find('svg').toggleClass('-rotate-90');
        $('.filter-display').toggleClass('h-[200px]');
    });

    // fetching the data json file
    $.ajax({
        url: 'data.json',
        dataType: "json",
        success: function (data) {
            let flag = data.flags.svg;
            let population = data.population;
            let region = data.region;
            let capital = data.capital;

            let card = `
            <div class="overflow-hidden rounded-md shadow-lg">
                <img src="${flag}" alt="">
                <div class="text-sm bg-white p-5">
                    <h3 class="font-bold text-base">Germany</h3>
                    <p>Population: <span class="population-txt">${population}</span></p>
                    <p>Region: <span class="region-txt">${region}</span></p>
                    <p>Capital: <span class="capital-txt">${capital}</span></p>
                </div>
            </div>
        `;

            $('.data-display').append(card);
        }
    });


});
