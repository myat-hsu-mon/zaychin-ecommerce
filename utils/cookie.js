export const parseCookie = (req, name) => {
  // console.log('req in parseCookie', req)
  // console.log('name in parseCookie', name)
    let c
    if (!req || typeof req.headers === 'undefined') {
        c = document.cookie
    } else {
        c = req.headers.cookie
    }
    var b = c.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}