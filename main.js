let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submet = document.getElementById('submet');

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
};

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}
submet.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total:total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if(newpro.count>1){
        for(let i = 0; i<newpro.count; i++ ){
        datapro.push(newpro);
        }
    }else if (newpro.count<1){
        datapro.push(newpro);
    }

    
    localStorage.setItem('product', JSON.stringify(datapro));
    console.log(datapro);
    clearData()
    showData()
};

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};


function showData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button>update</button></td>
                <td><button onclick="deleteData(${i})">delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnData = document.getElementById('deleteall');
    if(datapro.length>0){
        btnData.innerHTML = `
        <button onclick="deleteAll()">Delete All (${datapro.length})</button>
        `
    }else{
        btnData.innerHTML = '';
    }
};
showData();

function deleteData(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}

function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}