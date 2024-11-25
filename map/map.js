fetch('geomap.json')
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            const lksCoords = feature.geometry.coordinates; // [x, y]
            const wgsCoords = LKS92toWGS84.forward(lksCoords); // Pārveido uz [longitude, latitude]

            const marker = L.marker([wgsCoords[1], wgsCoords[0]]).addTo(map); // [latitude, longitude]
            const placeName = feature.properties.PLACENAME;
            marker.bindPopup(`<b>${placeName}</b>`);
        });
    })
    .catch(err => console.error('Datu ielādes kļūda:', err));


