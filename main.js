$(document).ready(() => {

    setTimeout(() => {
        $('.card').addClass('show');
    },1200);

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
        $('body').toggleClass('bg-slate-900');
    });

    // Show the filter item and add animation to show them
    const regions = [
        'Africa',
        'America',
        'Asia',
        'Europe'
    ];

    regions.forEach((item, index) => {
        const regionItem = `
            <div class="p-3 hover:bg-gray-200 transition-all cursor-pointer region-item" data-region="${item}">
                ${item}
            </div>
        `;

        $('.filter-display').append(regionItem);
    });

    $('#show-regions').click((e) => {
        $(e.currentTarget).find('svg').toggleClass('-rotate-90');
        $('.filter-display').toggleClass('h-[200px]');
    });

    // Filter cards based on selected region
    function filterCardsByRegion(region) {
        $('.card').each(function () {
            let cardRegion = $(this).data('region');
            if (cardRegion === region || region === "All") {
                $(this).fadeIn(); // Show the cards that match the selected region or show all cards if "All" is selected
            } else {
                $(this).fadeOut(); // Hide the cards that do not match the selected region
            }
        });
    }

    // Initially hide all cards
    $('.card').hide();

    // Fetching the data JSON file
    $.ajax({
        url: "https://raw.githubusercontent.com/Benjihunt97/REST-counry-API/main/data.json",
        dataType: "json",
        success: function (data) {
            // Iterate over each item in the JSON array
            $.each(data, function (index, country) {
                let flag = country.flags.svg;
                let population = country.population;
                let region = country.region;
                let capital = country.capital;
                let name = country.name;

                let card = `
                    <div class="card overflow-hidden rounded-md shadow-lg bg-white transition-all hover:scale-110" data-region="${region}">
                        <img src="${flag}" alt="">
                        <h3 class="font-bold text-base ml-5">${name}</h3>
                        <div class="text-sm p-5 card-body mt-5">
                            <p class="font-semibold">Population: <span class="population-txt font-normal">${population}</span></p>
                            <p class="font-semibold">Region: <span class="region-txt font-normal">${region}</span></p>
                            <p class="font-semibold">Capital: <span class="capital-txt font-normal">${capital}</span></p>
                        </div>
                    </div>
                `;

                $('.data-display').append(card);
            });

            // Show all cards after loading data
            $('.card').fadeIn();
        },
        error: function (xhr, status, error) {
            // Handle error
            console.error(status + ": " + error);
        }
    });

    // Event listener for region items
    $(document).on('click', '.region-item', function () {
        let selectedRegion = $(this).data('region');
        $('.selected-region').text(selectedRegion); // Update selected region text

        // Filter cards based on selected region
        filterCardsByRegion(selectedRegion);
    });

    // Event listener for search bar
    $('#search-region').on('input', function () {
        let searchText = $(this).val().trim().toLowerCase();

        $('.card').each(function () {
            let cardRegion = $(this).data('region').toLowerCase();
            let cardName = $(this).find('.font-bold').text().toLowerCase();
            if (cardRegion.includes(searchText) || cardName.includes(searchText)) {
                $(this).fadeIn(); // Show the cards that match the search text
            } else {
                $(this).fadeOut(); // Hide the cards that do not match the search text
            }
        });
    });
});
