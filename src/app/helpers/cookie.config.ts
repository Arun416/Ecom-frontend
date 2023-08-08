export function setCookie(name:any, value:any, days:any) {
   var expires;
   if(days) {
      var date = new Date();
      date.setTime(date.getTime()+days*24*60*60*1000);
      expires ="; expires" + date.toString();
   }
   else {
    expires= ""
  }

  document.cookie = name + "=" +value +expires + "; path=/"+"; domain="+ `${window.location.hostname}`
}
