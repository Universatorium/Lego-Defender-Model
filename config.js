// Hier werden die Daten gespeichert
const configData = {
    landRoverConfig: {
        model: 'Defender 110',
        color: 'Santorini Black',
        engine: '3.0L V6 Diesel',
        accessories: ['Off-Road Package', 'Roof Rack', 'Winch', 'Snorkel'],
    },
    buyerName: 'Max Mustermann',
    companyName: 'Astley Motors',
    contactDetails: [
        {"label": "Ansprechpartner", "value": "Max Reinlunzen"},
        {"label": "Telefon", "value": "0190-666-6666"},
        {"label": "Email", "value": "max.reinlunzen@example.com"},
        {"label": "Website", "value": "www.example.al"}
    ],
    companyLogoUrl: 'https://lego-defender-model-s3bucket.s3.eu-central-1.amazonaws.com/firmenlogo/Logo.png',
    carImagePath: 'https://lego-defender-model-s3bucket.s3.eu-central-1.amazonaws.com/bilder/carousel/range-rover-2015643_1280.jpg',
    totalCost: 50000,
};

// Funktion zum Erstellen des PDFs mit den Daten
async function generateConfigPDF() {
    try {
        // Hier sollte die Funktion createLandRoverConfigTemplate definiert sein.
        const pdfDoc = await createLandRoverConfigTemplate(
            configData.landRoverConfig,
            configData.buyerName,
            configData.companyName,
            configData.companyLogoUrl,
            configData.totalCost,
            configData.carImagePath,
            configData.contactDetails
        );

        pdfDoc.getBlob((blob) => {
            const pdfUrl = URL.createObjectURL(blob);
            const pdfLink = document.createElement('a');
            pdfLink.href = pdfUrl;
            pdfLink.target = '_blank';
            pdfLink.download = 'AstleyMotorsConfig.pdf';
            pdfLink.innerText = 'PDF Herunterladen';

            pdfLink.click();

            URL.revokeObjectURL(pdfUrl);
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

// Funktion zum Erstellen des PDF-Templates
async function createLandRoverConfigTemplate(config, buyerName, companyName, companyLogoUrl, totalCost, carImagePath, contactDetails) {
    const { model, color, engine, accessories } = config;

    try {
        const companyLogoBase64 = await imageToBase64(companyLogoUrl);
        const carImageBase64 = await imageToBase64(carImagePath);

        const documentDefinition = {
            content: [
                {
                    columns: [
                        {
                            stack: [
                                { text: companyName, style: 'companyName' },
                                { text: 'Kontaktinformationen:', style: 'subheader', margin: [0, 10], alignment: 'left' },
                                {
                                    text: contactDetails.map(detail => detail.label + ': ' + detail.value).join('\n'),
                                    style: 'contactDetails',
                                    alignment: 'left',
                                },
                            ],
                            width: '*',
                        },
                        { image: companyLogoBase64, fit: [120, 120], alignment: 'right', margin: [0, 0, 0, 10] },
                    ],
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 520, y2: 0, lineWidth: 2, lineColor: '#1570b6' }], margin: [0, 10, 0, 10] },
                '\n\n',
                {
                    stack: [
                        { text: ' Konfiguration', style: 'header', alignment: 'center', margin: [0, 0, 0, 20] },
                        {
                            columns: [
                                {
                                    stack: [
                                        { text: 'Modell:', style: 'subheader' },
                                        { text: model, margin: [0, 0, 0, 10] },
                                        { text: 'Farbe:', style: 'subheader' },
                                        { text: color, margin: [0, 0, 0, 10] },
                                        { text: 'Motor:', style: 'subheader' },
                                        { text: engine, margin: [0, 0, 0, 20] },
                                        { text: 'Zusätzliche Ausstattung:', style: 'subheader' },
                                        { text: createAccessoriesList(accessories), margin: [0, 0, 0, 20] },
                                        { text: 'Name des Käufers:', style: 'subheader' },
                                        { text: buyerName, margin: [0, 0, 0, 10] },
                                    ],
                                    width: '*',
                                },
                                {
                                    image: carImageBase64,
                                    fit: [300, 150],
                                    alignment: 'center',
                                    margin: [0, 20, 0, 0],
                                },
                            ],
                        },
                        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 520, y2: 0, lineWidth: 2, lineColor: '#1570b6' }], margin: [0, 10, 0, 10] },
                        '\n\n',
                        {
                            table: {
                                headerRows: 1,
                                widths: ['auto', 'auto'],
                                body: [
                                    // [{ text: 'Gesamtpreis: ', style: 'subheader', margin: [0, 0, 0, 5] }, { text: `${totalCost} €`, margin: [0, 0, 0, 5] }],
                                    [{ text: 'Nettogesamtpreis: ', style: 'subheader',margin: [0, 0, 0, 5] }, { text: `${(totalCost / 1.19).toFixed(2)} € (inkl. 19% MwSt.)`, margin: [0, 0, 0, 20], alignment: 'left' }],
                                    [{ text: 'Bruttogesamtpreis: ', style: 'subheader',margin: [0, 0, 0, 5] }, { text: `${totalCost} €`, margin: [0, 0, 0, 5] }],
                                    // [{ text: 'Netto: ', style: 'subheader',margin: [0, 0, 0, 5] }, { text: `${(totalCost / 1.19).toFixed(2)} € (inkl. 19% MwSt.)`, margin: [0, 0, 0, 20] }],
                                ],
                            },
                            layout: 'noBorders',
                        },
                    ],
                },
            ],
            styles: {
                header: { fontSize: 18, bold: true, color: '#1570b6', alignment: 'left', margin: [0, 10, 0, 20] },
                subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
                companyName: { fontSize: 20, bold: true, color: '#1570b6', alignment: 'left', margin: [0, 0, 0, 10] },
                contactDetails: { fontSize: 12, margin: [0, 0, 0, 10] },
            },
        };

        return pdfMake.createPdf(documentDefinition);
    } catch (error) {
        console.error('Error creating PDF:', error);
        throw error;
    }
}

// Hier kommt der restliche Code für createAccessoriesList und imageToBase64
function createAccessoriesList(accessories) {
    const accessoryList = [];
    accessories.forEach((accessory, index) => {
        accessoryList.push(`${index + 1}. ${accessory}`);
    });
    return accessoryList.join('\n');
}

function imageToBase64(imagePath) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const dataURL = canvas.toDataURL('image/jpeg');
            resolve(dataURL);
        };
        img.onerror = reject;
        img.src = imagePath;
    });
}
