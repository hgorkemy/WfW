# 🎬 WfW - Watch for Watch

IMDb tarzı bir film keşif ve puanlama platformu. TMDB API kullanarak popüler filmleri keşfedin, arayın ve puanlayın.

## ✨ Özellikler

- 🎥 Popüler filmleri görüntüleme
- 🔍 Film arama (gerçek zamanlı)
- ⭐ Film puanlama sistemi (LocalStorage ile)
- 📱 Responsive tasarım
- 🌙 Dark/Light mode desteği
- 🎨 Modern, şık arayüz

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/hgorkemy/WfW.git
cd WfW
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun:
```bash
cp .env.example .env
```

4. TMDB API key'inizi `.env` dosyasına ekleyin:
```
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

TMDB API key almak için:
- https://www.themoviedb.org/ adresine gidin
- Ücretsiz hesap oluşturun
- Settings > API > Create > Developer
- API Key (v3 auth) kopyalayın

5. Development server'ı başlatın:
```bash
npm run dev
```

## 🏗️ Build

Production build için:
```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulur.

## 📦 Vercel'e Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hgorkemy/WfW)

### Manuel Deploy:

1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Environment Variables ekleyin:
   - `VITE_TMDB_API_KEY`: TMDB API key'iniz
   - `VITE_TMDB_BASE_URL`: `https://api.themoviedb.org/3`
4. Deploy butonuna tıklayın

## 🛠️ Teknolojiler

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **TMDB API** - Film verileri

## 📁 Proje Yapısı

```
src/
├── components/      # Reusable components
│   ├── MovieCard/
│   ├── Navigation/
│   └── RatingStars/
├── pages/          # Page components
│   ├── Home/
│   ├── Search/
│   └── MovieDetail/
├── services/       # API services
│   └── http/
├── lib/           # Utilities
│   ├── debounce.ts
│   ├── env.ts
│   └── format.ts
└── app/           # App configuration
    └── router/
```

## 🎨 Özellikler Detay

### Ana Sayfa
- TMDB'den popüler filmler
- Infinite scroll (Daha fazla yükle butonu)
- Film kartları grid layout

### Arama Sayfası
- Gerçek zamanlı arama
- Debounced input (500ms)
- Arama sonuçları grid view

### Film Detay Sayfası
- Tam film bilgileri
- Backdrop ve poster görseller
- Film istatistikleri (bütçe, hasılat, süre)
- Kullanıcı puanlama sistemi
- Genre badges

## 📄 License

MIT

## 👨‍💻 Geliştirici

- GitHub: [@hgorkemy](https://github.com/hgorkemy)
