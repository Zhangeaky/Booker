const parser = new DOMParser;//解析服务器返回的内容

const linksSection = document.querySelector('.links');
const errorMessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');//表单
const newLinkURL = document.querySelector('.new-link-url');//input 输入框
const newLinkSubmit = document.querySelector('.new-link-submit');
const clearStorageButton = document.querySelector('.clear-storage');

const parseResponse = (text)=>{
    return parser.parseFromString(text,'text/html');
};//解析函数 获取服务器的响应,并解析成为DOM节点结构树
const findTitle =(nodes)=>{
    return nodes.querySelector('title').innerText;
};//从结构树中找title
const clearForm = ()=>{
    newLinkURL.value = 'Hhhh';//nodevalue
};//清除表单内容
const storeLink = (title,url)=>{
    localStorage.setItem(url,JSON.stringify({title:title,url:url}));
};// 存储url和标题到localstorage

const convertToElement = (link)=>{
    return `
    <div class="link">
    <h3>${link.title}</h3>
    <p>
        <a href="${link.url}">${link.url}</a>
    </p>
    </div>
    `;

};//转成HTML标


//返回localstorage中的所有键值组成的数组
const getLink = ()=>{
    return Object.keys(localStorage)
                    .map(key => JSON.parse(localStorage.getItem(key)));        
}

const renderLinks = ()=>{
    const linkElements = getLink().map(convertToElement.join(' '));//用' ' 来分隔
    linksSection.innerHTML = linkElements;
};//显示所有连接,并将他们添加到DOM


newLinkURL.addEventListener('keyup',()=>{
    newLinkSubmit.disabled = !newLinkURL.validity.valid;//chromeium的API使按钮无效
});

newLinkForm.addEventListener('submit',(event)=>{
    event.preventDefault();//告诉chromiu不要触发表单提交事件的默认操作,不要发送http请求
    const url = newLinkURL.value;
   
    fetch(url)//使用fetchAPI获取URL指向的内容 
    .then(response=>response.text())
    .then(parseResponse)
    .then(findTitle)
    .then((title) =>{storeLink(title,url)})//url,title 保存到localstorage中,
    .then(clearForm)
    .then(renderLinks);
});
clearStorageButton.addEventListener('click',()=>{
    localStorage.clear();
    linksSection.innerHTML = '欢迎光临!';//UI界面删除所有连接
});
renderLinks();

