$(function () {
    loadproducts();
    $("#products").on("click", ".btn-danger", handledelete);
    $("#addBtn").click(addproduct);
  });
  function addproduct() {
    var name = $("#n1").val();
    var price = $("#p1").val();
    var color = $("#c1").val();
    var department = $("#d1").val();
    var description = $("#des1").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/",
      method: "POST",
      data: { name, price, color, department, description },
      success: function (response) {
        console.log(response);
        loadproducts();
      },
    });
  }
  function handledelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".product");
    let ID = parentDiv.attr("data-id");
    console.log(ID);
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + ID,
      method: "DELETE",
      success: function () {
        loadproducts();
      },
    });
  }
  

  function loadOneproduct() {
    showSpinner();
    const searchProduct = $("#InputName").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products",
      method: "GET",
      success: function (response) {
        if (searchProduct != "") {
          for (let i = 0; i < response.length; i++) {
            res = response[i];
            if (searchProduct === res.name) {
              $("#showOneProduct").modal("show");
              $("#proName").text(res, name);
              $("#proPrice").text(res, price);
              $("#proCIr").text(res, color);
              $("#proDpt").text(res, department);
              $("#proDsc").text(res, description);
              break;
            }
          }
        } else {
          alert("please type the product name");
        }
        removeSpinner();
      },
    });
  }