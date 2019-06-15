const getFavIcon = require('get-website-favicon')

const sizeOrder = ['192x192', '180x180', '167x167', '152x152', '128x128', '120x120', '76x76', '57x57']

module.exports = async (request, response) => {
    const query = require('url').parse(request.url, true).query
    const url = query.url
    if (!url) {
        response.writeHead(404)
        response.end()
        return
    }

    getFavIcon(url).then(data => {
        let iconUrl
        const rankedIcons = data.icons.sort(icon => icon.rank)

        // look for largest sizes first
        for (let size of sizeOrder) {
            const icon = rankedIcons.find(item => item.sizes == size)
            if (icon) {
                iconUrl = icon.src
                break
            }
        }

        // then look for top ranked icons
        if (!iconUrl) {
            for (let icon of rankedIcons) {
                if (icon.src) {
                    iconUrl = icon.src
                    break
                }
            }
        }

        if (iconUrl) {
            response.writeHead(301, { 'Location': iconUrl })
        } else {
            response.writeHead(404)
        }
        response.end()
    })
}