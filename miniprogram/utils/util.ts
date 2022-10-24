export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};

/**
 * 处理富文本里的内容
 * @param html
 * @returns {void|string|*}
 */
interface OptType {
  isBr?: boolean
}
export function formatRichText(html: string, opt: OptType = {
}) {
  // 这一步处理 img 
  let newContent = formatRichImg(html)
  // 这一步处理 br
  opt.isBr && (newContent = formatRichBr(newContent))
  // 这一步处理 a 标签
  // newContent = formatRichA(newContent)
  return newContent;
}
/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * @param html
 * @returns {void|string|*}
 */
function formatRichImg(html: string) {
  let imgContent = html.replace(/<img[^>]*>/gi, function (match) {
    match = match.replace(/style="[^"]+"/gi, "").replace(/style='[^']+'/gi, "");
    match = match.replace(/width="[^"]+"/gi, "").replace(/width='[^']+'/gi, "");
    match = match
      .replace(/height="[^"]+"/gi, "")
      .replace(/height='[^']+'/gi, "");
    return match;
  });
  imgContent = imgContent.replace(/style="[^"]+"/gi, function (match) {
    match = match
      .replace(/width:[^;]+;/gi, "width:100%;")
      .replace(/width:[^;]+;/gi, "width:100%;");
    return match;
  });
  imgContent = formatRichBr(imgContent);
  imgContent = imgContent.replace(
    /\<img/gi,
    '<img style="width:100%;height:auto;display:block;margin:10px 0;"'
  );
  return imgContent
}
/**
 * 处理富文本里的 a标签 添加 固定的点击事件名称，且替换为 view
 * 1.替换标签名称为 view 
 * 2.添加 点击事件
 * 3.
 * @param html
 * @returns {void|string|*}
 */
function formatRichA(html: string) {
  let aContent = html.replace(/\<a/gi, '<p ')
  aContent = aContent.replace(/\/a>/gi, '/p>');
  return aContent
}
/**
 * 处理富文本里的 br
 * 去掉 <br/> 标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichBr(html: string) {
  return html.replace(/<br[^>]*\/>/gi, "");
}

/**
 * 判断 url 是否为可以跳转链接
 * 
 * @param utl
 * @returns {boolean}
 */
export function checkUrl(URL: string) {
  var str = URL;
  //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
  //下面的代码中应用了转义字符"\"输出一个字符"/"
  var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  var objExp = new RegExp(Expression);
  if (objExp.test(str) == true) {
      return true;
  } else {
      return false;
  }
}