$(document).ready(function () {

    getAPI();

    function printResult(itemList) {

        $.each(itemList, function (i, value) {
            $("#container").append("<div id='" + i + "' class='pic'><img id='img" + i + "' src='" + value.media.m + "'/></div>");
            $("#" + i).on("click", {
                info: value.description,
                title: value.title,
                author: value.author,
                date: value.date_taken,
                tags: value.tags
            }, handler);
        });
    }

    function getAPI(searchInput) {
        var searchInput = $('#searchText').val();

        $('#container').empty();

        if (searchInput == "") {
            $.getJSON("https://www.flickr.com/services/feeds/photos_public.gne?tags=soccer&format=json&jsoncallback=?", function (data) {
                var itemList = data.items;
                printResult(itemList);
            });
        } else {
            $.getJSON("https://www.flickr.com/services/feeds/photos_public.gne?tags=" + searchInput + "&format=json&jsoncallback=?", function (data) {
                var itemList = data.items;
                printResult(itemList);
            });
        }
    }

    $("#searchText").keypress(function (event) {
        if (event.which == 13) {
            enterSearch();
        }
    });

    function enterSearch() {
        var searchInput = $('#searchText').val();

        if (searchInput == "") {
            alert("You need to write something!");
            getAPI();
        } else {
            getAPI(searchInput);
        }
    }

    $('#searchButton').on('click', function () {

        enterSearch();

    });

    function handler(e) {
        $("#moreinfo").dialog({
            autoOpen: false,
            title: e.data.title,
            position: { my: "center",
            at: "center",
            of: window }
        });
        $('#moreinfo').empty()
        $("#moreinfo").dialog("open");
        $("#moreinfo").append("<p><b>  ID: </b>" + e.target.id + "</p>");
        $("#moreinfo").append("<p><b> Title:</b>" + e.data.title + "</p>");
        $("#moreinfo").append("<p><b>  Description:</b> " + e.data.info + "</p>");
        $("#moreinfo").append("<p><b>  Author:</b> " + e.data.author + "</p>");
        $("#moreinfo").append("<p><b> Date:</b> " + e.data.date + "</p>");
        $("#moreinfo").append("<p><b> Tags: </b>" + e.data.tags + "</p>");

    };
});
