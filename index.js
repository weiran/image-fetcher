const fetch = require('node-fetch')
const ImageResolver = require('image-resolver')

module.exports = async (request, response) => {
    const query = require('url').parse(request.url, true).query
    const url = query.url
    if (!url) {
        response.writeHead(404)
        response.end()
        return
    }

    const headerRequest = await fetch(url, { method: 'HEAD' })
    const contentType = await headerRequest.headers['_headers']['content-type'][0]
    const isHtml = contentType.includes('text/html')
    if (!isHtml) {
        response.writeHead(404)
        response.end()
        return
    }

    var resolver = new ImageResolver()
    resolver.register(new ImageResolver.FileExtension())
    resolver.register(new ImageResolver.MimeType())
    resolver.register(new ImageResolver.Opengraph())
    resolver.register(new ImageResolver.Webpage())

    resolver.resolve(url, function(result) {
        if (result) {
            response.writeHead(301, { 'Location': result.image })
            response.end()
        } else {
            response.writeHead(404)
            response.end()
        }
    })
}