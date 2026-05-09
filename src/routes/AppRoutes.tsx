import { Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/Layout/AppShell';
import { GalleryPage } from '../pages/GalleryPage';
import { PetDetailPage } from '../pages/PetDetailPage';
import { AboutPage } from '../pages/AboutPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/pets/:id" element={<PetDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

