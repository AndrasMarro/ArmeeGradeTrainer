const ranks = [
  // Rekrut - kein offizielles Abzeichen
  {
    name: { de: 'Rekrut', fr: 'Recrue' },
    category: { de: 'Mannschaft', fr: 'Troupe' },
    image: null,
  },

  // Mannschaft
  {
    name: { de: 'Soldat', fr: 'Soldat' },
    category: { de: 'Mannschaft', fr: 'Troupe' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/1266c5d9-97c4-478a-abe2-f2ddc77d42e0.jpeg?rect=0%2C7%2C471%2C265&auto=format',
  },
  {
    name: { de: 'Gefreiter', fr: 'Appointé' },
    category: { de: 'Mannschaft', fr: 'Troupe' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/b6d1f53c-1209-4021-b24c-fb1ebe8dd14c.jpeg?rect=0%2C7%2C471%2C265&auto=format',
  },

  // Unteroffiziere
  {
    name: { de: 'Korporal', fr: 'Caporal' },
    category: { de: 'Unteroffiziere', fr: 'Sous-officiers' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/5be804f7-9840-4120-9932-2a933bdb79fe.jpeg?rect=0%2C7%2C471%2C265&auto=format',
  },
  {
    name: { de: 'Wachtmeister', fr: 'Sergent' },
    category: { de: 'Unteroffiziere', fr: 'Sous-officiers' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/433b5bd8-ddac-4e59-b1f0-0108da39a899.jpeg?rect=0%2C8%2C471%2C265&auto=format',
  },
  {
    name: { de: 'Oberwachtmeister', fr: 'Sergent-chef' },
    category: { de: 'Unteroffiziere', fr: 'Sous-officiers' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/1153e93e-763d-4110-b795-5179912a23fe.jpeg?auto=format',
  },

  // Höhere Unteroffiziere
  {
    name: { de: 'Feldweibel', fr: 'Sergent-major' },
    category: { de: 'Höhere Unteroffiziere', fr: 'Sous-officiers supérieurs' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/9f3590cb-e416-4a9d-8b19-7b20b4dc34d6.jpeg?auto=format',
  },
  {
    name: { de: 'Fourier', fr: 'Fourrier' },
    category: { de: 'Höhere Unteroffiziere', fr: 'Sous-officiers supérieurs' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/6800e7f6-b0fd-4a8f-9210-8c3a0e19f480.jpeg?auto=format',
  },
  {
    name: { de: 'Hauptfeldweibel', fr: 'Sergent-major chef' },
    category: { de: 'Höhere Unteroffiziere', fr: 'Sous-officiers supérieurs' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/4b3554bc-62ee-407a-a650-b3b824896e13.jpeg?auto=format',
  },
  {
    name: { de: 'Adjutant Unteroffizier', fr: 'Adjudant sous-officier' },
    category: { de: 'Höhere Unteroffiziere', fr: 'Sous-officiers supérieurs' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/a102a446-ffe3-4df8-b79d-b4962efb2f2c.jpeg?auto=format',
  },
  {
    name: { de: 'Stabsadjutant', fr: "Adjudant d'état-major" },
    category: { de: 'Höhere Unteroffiziere', fr: 'Sous-officiers supérieurs' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/93882a6f-1e6e-4472-afbd-a2b7a861af5e.jpeg?auto=format',
  },
  {
    name: { de: 'Hauptadjutant', fr: 'Adjudant-major' },
    category: { de: 'Höhere Unteroffiziere', fr: 'Sous-officiers supérieurs' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/1228d305-af3c-4400-a46a-52a65ec4d5e4.jpeg?auto=format',
  },
  {
    name: { de: 'Chefadjutant', fr: 'Adjudant-chef' },
    category: { de: 'Höhere Unteroffiziere', fr: 'Sous-officiers supérieurs' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/e1e4f8d9-a80d-40a6-9af3-4858c7c44f2c.jpeg?auto=format',
  },

  // Subalternoffiziere
  {
    name: { de: 'Leutnant', fr: 'Lieutenant' },
    category: { de: 'Subalternoffiziere', fr: 'Officiers subalternes' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/f696e102-b5f1-469b-bf2a-7d3506651181.jpeg?auto=format',
  },
  {
    name: { de: 'Oberleutnant', fr: 'Premier-lieutenant' },
    category: { de: 'Subalternoffiziere', fr: 'Officiers subalternes' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/71d22399-6036-4f5a-8ee6-2a007d5497ab.jpeg?auto=format',
  },

  // Hauptleute
  {
    name: { de: 'Hauptmann', fr: 'Capitaine' },
    category: { de: 'Stufe Hauptmann', fr: 'Rang de capitaine' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/17626332-ffb0-4b36-aa42-a4912b9e6dc9.jpeg?auto=format',
  },

  // Stabsoffiziere
  {
    name: { de: 'Major', fr: 'Major' },
    category: { de: 'Stabsoffiziere', fr: "Officiers d'état-major" },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/0e5e9b42-9bf4-4d69-9e1a-eebc9c84b657.jpeg?auto=format',
  },
  {
    name: { de: 'Oberstleutnant', fr: 'Lieutenant-colonel' },
    category: { de: 'Stabsoffiziere', fr: "Officiers d'état-major" },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/cb440b7d-cdc1-4848-9d7f-1b7aa24d6e6f.jpeg?auto=format',
  },
  {
    name: { de: 'Oberst', fr: 'Colonel' },
    category: { de: 'Stabsoffiziere', fr: "Officiers d'état-major" },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/c8f16d24-7189-43d6-ba57-df4b979f540b.jpeg?auto=format',
  },

  // Fachoffiziere
  {
    name: { de: 'Fachoffizier', fr: 'Officier spécialiste' },
    category: { de: 'Fachoffiziere', fr: 'Officiers spécialistes' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/e1d3c4fe-1946-4b6e-8243-1452f25be783.jpeg?auto=format',
  },

  // Höhere Stabsoffiziere
  {
    name: { de: 'Brigadier', fr: 'Brigadier' },
    category: { de: 'Höhere Stabsoffiziere', fr: "Officiers supérieurs d'état-major" },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/027e5c86-e517-4005-9e13-3e2c65e00337.jpeg?auto=format',
  },
  {
    name: { de: 'Divisionär', fr: 'Divisionnaire' },
    category: { de: 'Höhere Stabsoffiziere', fr: "Officiers supérieurs d'état-major" },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/4c2095a5-41c7-4a7d-985d-6c28736ad52b.jpeg?auto=format',
  },
  {
    name: { de: 'Korpskommandant', fr: 'Commandant de corps' },
    category: { de: 'Höhere Stabsoffiziere', fr: "Officiers supérieurs d'état-major" },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/4c2095a5-41c7-4a7d-985d-6c28736ad52b.jpeg?auto=format',
  },

  // General
  {
    name: { de: 'General', fr: 'Général' },
    category: { de: 'Oberbefehlshaber', fr: 'Commandant en chef' },
    image:
      'https://prod-armeech-hcms-sdweb.imgix.net/2024/06/25/3dc721fb-0793-4399-968b-baf8286222fd.jpeg?auto=format',
  },
];

export default ranks;
