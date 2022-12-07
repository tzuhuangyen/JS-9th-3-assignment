console.log("test");
let productData = [];
//0.init
function init() {
  getProductData();
}
init();
//1.getProductData
function getProductData() {
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`
    )
    .then(function (response) {
      productData = response.data.products;
      renderProductList(productData);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
//2.renderProductList
const productWrap = document.querySelector(".productWrap");
//console.log(productWrap);

//console.log(productData);
const searchResultText = document.querySelector("#searchResult-text");
function renderProductList(data) {
  let str = "";
  data.forEach((item) => {
    str += ` <li class="productCard">
      <h4 class="productType">新品</h4>
      <img
        src="${item.images}"
        alt=""
      />
      <a href="#" data-id="${item.id} "class="js-addCart addCardBtn">加入購物車</a>
      <h3>${item.title}</h3>
      <del class="originPrice">NT${item.origin_price}</del>
      <p class="nowPrice">NT$${item.price}</p>
      </li>`;
  });
  productWrap.innerHTML = str;
  searchResultText.innerHTML = `本次搜尋共 ${data.length} 筆資料`;
}
//3.下拉式選單
const productSelect = document.querySelector(".productSelect");
productSelect.addEventListener("change", (e) => {
  e.preventDefault();
  //   console.log(e.target.value);
  const currOption = e.target.value;
  if (currOption === "全部") {
    renderProductList(productData);
  } else {
    let targetOption = [];
    productData.forEach((item) => {
      if (item.category === currOption) targetOption.push(item);
    });
    renderProductList(targetOption);
  }
});
