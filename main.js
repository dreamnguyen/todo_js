var newArray = []; // khai báo mảng mới có tên newArray

const btn = document.getElementById("submit-btn"); //tạo biến btn lấy element từ nút btn 
const list = document.getElementById("list"); //tạo biến list  lấy element từ thẻ ul
const input = document.getElementById("input"); // tạo biến input lấy element từ thẻ input 
let index // tạo biến index

const localList = JSON.parse(localStorage.getItem("list")) || [] //tạo biến localList get key list from localStorage
newArray = localList;  //Gán locallist cho biến newArray

const view = () => { // tạo hàm view 
    let string = ""; // tạo biến string rỗng
    for (i = 0; i < newArray.length; i++) { // vòng lặp for duyệt từ phần tử đầu tiên đến phần từ cuối cùng trong mảng
        const element = newArray[i]; // tạo biến ele gán với phần tử thứ i trong mảng newarray
        string = string + ` 
        <li>${element} 
        <button onclick = "onEdit(${i})">Edit</button> 
        <button onclick = "onDelete(${i})">Delete</button> 
        `
    }
    list.innerHTML = string; // biến list trả về HTML bằng chuỗi string
}
view() // gọi lại hàm view in ra màn hình


const addData = (data) => {
    if (index || index === 0) { // nếu index = true hoặc index = 0 thì 
        newArray.splice(index, 1, data) // xóa dữ liệu từ mảng newArray ở phần tử thứ index, xóa 1 phần tử, thêm dữ liệu data truyền từ bàn pím
        index = null // giá trị index gán bằng null
    } else {
        newArray.push(data) // đẩy "data" vào mảng newArray
    }
    input.value = ""; // giá trị của ô input = trống
    localStorage.setItem("list", JSON.stringify(newArray)) // JSON stringify: convert array to string
}
btn.addEventListener("click", () => { // nút button lắng nghe sự kiện click  từ người dùng
    addData(input.value); // truyền giá trị của ô input vào hàm addData
    view(); // view kết quả ra màn hình
})

const deleteArray = (i) => { // tạo hàm deleteArray với tham số i 
    newArray.splice(i, 1) // thực hiện xóa 1 phần tử tại vị trí i
}

const onEdit = (i) => { // tao hàm onEdit với tham số i
    input.value = newArray[i] // gán giá trị của ô input bằng với phần tử thứ i của mảng newArray
    index = i // gán giá trị index bằng với tham số i
}

const onDelete = (i) => { // tạo hàm onDelete với tham số i
    index = i; // gán giá trị index bằng với tham số i
    newArray.splice(i, 1) // thực hiện xóa 1 phần tử tại vị trí i
    view(); // view kết quả ra màn hình
    localStorage.setItem("list", JSON.stringify(newArray)); //  xóa giá trị của key list từ localstorage 
}