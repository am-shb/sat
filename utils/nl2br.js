export default function (str) {
  if (typeof str === "undefined" || str === null) {
    return "";
  }
  var breakTag = "<br />";
  return (str + "").replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    "$1" + breakTag + "$2"
  );
}
