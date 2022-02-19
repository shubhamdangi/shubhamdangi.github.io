$(document).ready(function () {
  // MODAL
  var modalText = {
    discover: {
      title: "Zopstore",
      tag: "Buy or Sell anything at your college campus.",
      detail:
        "Zopstore is an online platform where students can Buy or Sell anything at their college/hostel campus,Students can also post about a Lost or Found item at the campus.",
      link: "https://zopstore.live",
    },
    ordering: {
      title: "BraveHearts",
      tag: "Post quotes honoring our brave soldiers.",
      detail:
        "A platform where users can write and dedicate articles, quotes, or poems honoring our Brave Soldiers and Veterans for their sacrifices towards the nation.",
      link: "https://bravehearts-in.web.app",
    },
    newrelic: {
      title: "Covid Prayaas",
      tag: "Covid Resources Across India.",
      detail:
        "A completely responsive web application containing comprehensive collection of COVID-19 resources across India.",
      link: "https://covidprayaas.web.app",
    },
    roambi: {
      title: "Resources Point",
      tag: "Web/App Development Resources.",
      detail:
        "A one-stop platform for resources related to Web development, App Development, Information Security, UI/UX Design, Automation and much more",
      link: "https://shubhamdangi.me/resources",
    },

    powur: {
      title: "Shopcube",
      tag: "E-commerse web application.",
      detail:
        "Shopcube is a highly customized real-world E-Commerce web application that contains, Login / Register functionality, Add to cart, save shipping address, edit user profile, add a payment method, give reviews and rating feature, Admin area to manage customers, products, and orders, Product search, top products carousel, and pagination",
      link: "https://shopcube.herokuapp.com",
    },

    mystand: {
      title: "My ProTask",
      tag: "Task Manager.",
      detail:
        "A Task Manager allowing users to Add, Remove, Modify tasks from the list. Users can provide a deadline for each particular task.",
      link: "https://protask.shubhamdangi.me/",
    },
  };

  $("#gallery .button").on("click", function () {
    fillModal(this.id);
    $(".modal-wrap").addClass("visible");
  });

  $(".close").on("click", function () {
    $(".modal-wrap, #modal .button").removeClass("visible");
  });

  $(".mask").on("click", function () {
    $(".modal-wrap, #modal .button").removeClass("visible");
  });

  var carousel = $("#carousel"),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $("#next").click(function () {
    shiftSlide(-1);
  });
  $("#prev").click(function () {
    shiftSlide(1);
  });

  carousel.on("mousedown", function () {
    if (carousel.hasClass("transition")) return;
    dragStart = event.pageX;
    $(this).on("mousemove", function () {
      dragEnd = event.pageX;
      $(this).css("transform", "translateX(" + dragPos() + "px)");
    });
    $(document).on("mouseup", function () {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $(".carousel-wrap, .slide").css("width", slideWidth);
    $(".modal").css("max-width", slideWidth);
    $("#carousel").css("left", slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass("transition")) return;
    dragEnd = dragStart;
    $(document).off("mouseup");
    carousel
      .off("mousemove")
      .addClass("transition")
      .css("transform", "translateX(" + direction * slideWidth + "px)");
    setTimeout(function () {
      if (direction === 1) {
        $(".slide:first").before($(".slide:last"));
      } else if (direction === -1) {
        $(".slide:last").after($(".slide:first"));
      }
      carousel.removeClass("transition");
      carousel.css("transform", "translateX(0px)");
    }, 700);
  }

  function fillModal(id) {
    $("#modal .title").text(modalText[id].title);
    $("#modal .detail").text(modalText[id].detail);
    $("#modal .tag").text(modalText[id].tag);
    if (modalText[id].link)
      $("#modal .button")
        .addClass("visible")
        .parent()
        .attr("href", modalText[id].link);

    $.each($("#modal li"), function (index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($("#modal .slide"), function (index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + "-" + index + ".jpg') center center/cover",
        backgroundSize: "cover",
      });
    });
  }
});
