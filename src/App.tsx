import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, NavTab } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './views/HomePage';
import { CatalogPage } from './views/CatalogPage';
import { CreateDossierPage } from './views/CreateDossierPage';
import { GeminiAssistantPage } from './views/GeminiAssistantPage';
import { ClaimVerifierPage } from './views/ClaimVerifierPage';
import { SavedDossiersPage } from './views/SavedDossiersPage';
import { SourcesLibraryPage } from './views/SourcesLibraryPage';
import { AboutProjectPage } from './views/AboutProjectPage';
import { CraftDossier, ClaimCheckReport } from './types/craft';
import { INITIAL_PRODUCTS } from './data/initialProducts';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [dossiers, setDossiers] = useState<CraftDossier[]>(INITIAL_PRODUCTS);
  const [activeProductForAssistant, setActiveProductForAssistant] = useState<Partial<CraftDossier> | null>(null);
  const [activeTextForVerifier, setActiveTextForVerifier] = useState<string>('');
  const [activeProductForVerifier, setActiveProductForVerifier] = useState<Partial<CraftDossier> | null>(null);
  const [editingDossier, setEditingDossier] = useState<Partial<CraftDossier> | null>(null);

  // Fetch dossiers from server on mount
  useEffect(() => {
    fetchDossiers();
  }, []);

  const fetchDossiers = async () => {
    try {
      const res = await fetch('/api/dossiers');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.dossiers) && data.dossiers.length > 0) {
          setDossiers(data.dossiers);
        }
      }
    } catch (err) {
      console.warn('Using client memory seeds for dossiers:', err);
    }
  };

  const handleSaveDossier = async (dossierData: Partial<CraftDossier>): Promise<CraftDossier> => {
    const isEditing = Boolean(dossierData.id && dossiers.some((d) => d.id === dossierData.id));
    const url = isEditing ? `/api/dossiers/${dossierData.id}` : '/api/dossiers';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dossierData),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Lỗi lưu hồ sơ vào máy chủ');
      }

      const saved: CraftDossier = await res.json();
      await fetchDossiers();
      return saved;
    } catch (err: any) {
      // Fallback local update
      const now = new Date().toISOString();
      const fallbackSaved: CraftDossier = {
        ...dossierData,
        id: dossierData.id || `f05-${Date.now()}`,
        name: dossierData.name || 'Sản phẩm mới',
        category: dossierData.category || 'Gốm sứ',
        villageOrRegion: dossierData.villageOrRegion || 'Chưa rõ',
        primaryMaterial: dossierData.primaryMaterial || 'Chưa rõ',
        usagePurpose: dossierData.usagePurpose || '',
        craftingProcess: dossierData.craftingProcess || '',
        distinctiveFeatures: dossierData.distinctiveFeatures || '',
        imageUrl:
          dossierData.imageUrl ||
          'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
        referenceSources: dossierData.referenceSources || 'Chờ bổ sung nguồn',
        verificationStatus: dossierData.verificationStatus || 'Chờ bổ sung nguồn',
        createdAt: dossierData.createdAt || now,
        updatedAt: now,
      } as CraftDossier;

      setDossiers((prev) => {
        const existingIdx = prev.findIndex((d) => d.id === fallbackSaved.id);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = fallbackSaved;
          return updated;
        }
        return [fallbackSaved, ...prev];
      });

      return fallbackSaved;
    }
  };

  const handleDeleteDossier = async (id: string) => {
    try {
      await fetch(`/api/dossiers/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Could not delete from server API, updating state locally', e);
    }
    setDossiers((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSaveArticleToDossier = async (
    productId: string,
    article: NonNullable<CraftDossier['generatedArticle']>
  ) => {
    const target = dossiers.find((d) => d.id === productId);
    if (!target) return;

    const updated = {
      ...target,
      generatedArticle: article,
    };
    await handleSaveDossier(updated);
  };

  const handleSaveReportToDossier = async (productId: string, report: ClaimCheckReport) => {
    const target = dossiers.find((d) => d.id === productId);
    if (!target) return;

    const updated = {
      ...target,
      claimCheckResult: report,
    };
    await handleSaveDossier(updated);
  };

  // Navigations with contexts
  const handleOpenAssistantWithProduct = (dossier: Partial<CraftDossier>) => {
    setActiveProductForAssistant(dossier);
    setActiveTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVerifierWithContext = (
    text: string,
    productContext: Partial<CraftDossier>
  ) => {
    setActiveTextForVerifier(text);
    setActiveProductForVerifier(productContext);
    setActiveTab('verifier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVerifierForDossier = (dossier: CraftDossier) => {
    const sampleText = dossier.generatedArticle
      ? [
          dossier.generatedArticle.title,
          dossier.generatedArticle.overview,
          dossier.generatedArticle.techniques,
          dossier.generatedArticle.culturalValue,
        ].join('\n\n')
      : [
          dossier.name,
          `Địa phương: ${dossier.villageOrRegion}`,
          `Chất liệu: ${dossier.primaryMaterial}`,
          dossier.craftingProcess,
          dossier.culturalValue || dossier.productStory || '',
        ].join('\n\n');

    setActiveTextForVerifier(sampleText);
    setActiveProductForVerifier(dossier);
    setActiveTab('verifier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditFromSaved = (dossier: CraftDossier) => {
    setEditingDossier(dossier);
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe4] text-[#2b1f17]">
      <Header />
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={dossiers.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            totalProducts={dossiers.length}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogPage
            products={dossiers}
            onOpenAssistant={handleOpenAssistantWithProduct}
            onOpenVerifier={handleOpenVerifierForDossier}
          />
        )}

        {activeTab === 'create' && (
          <CreateDossierPage
            initialData={editingDossier}
            onSaveDossier={handleSaveDossier}
            onProceedToAssistant={handleOpenAssistantWithProduct}
            onProceedToVerifier={(d) => {
              setActiveProductForVerifier(d);
              setActiveTextForVerifier(
                `${d.name || ''}\n${d.villageOrRegion || ''}\n${d.craftingProcess || ''}\n${d.culturalValue || ''}`
              );
              setActiveTab('verifier');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'assistant' && (
          <GeminiAssistantPage
            initialProduct={activeProductForAssistant}
            savedProducts={dossiers}
            onSaveArticleToDossier={handleSaveArticleToDossier}
            onProceedToVerifier={handleOpenVerifierWithContext}
          />
        )}

        {activeTab === 'verifier' && (
          <ClaimVerifierPage
            initialText={activeTextForVerifier}
            initialProduct={activeProductForVerifier}
            savedProducts={dossiers}
            onSaveReportToDossier={handleSaveReportToDossier}
          />
        )}

        {activeTab === 'saved' && (
          <SavedDossiersPage
            dossiers={dossiers}
            onEditDossier={handleEditFromSaved}
            onDeleteDossier={handleDeleteDossier}
            onOpenAssistant={handleOpenAssistantWithProduct}
            onOpenVerifier={handleOpenVerifierForDossier}
          />
        )}

        {activeTab === 'sources' && <SourcesLibraryPage />}

        {activeTab === 'about' && <AboutProjectPage />}
      </main>

      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
