import React from 'react';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import Gallery from '../components/Gallery';
import EasterEgg from '../components/EasterEgg';
import EasterEggHuntStatus from '../components/EasterEggHuntStatus';

const imageUrls = [
  "/lovable-uploads/b94290fa-5e3d-42eb-9b0d-f040b603405d.png",
  "/lovable-uploads/f5b3bbfc-3579-4eca-9d82-5ba501a05c5e.png",
  "/lovable-uploads/a0268073-2503-4c82-ac84-2f21e5046d7e.png",
  "/lovable-uploads/96810cc3-ece9-40aa-a367-58cbb3b7935d.png",
  "/lovable-uploads/d2a01df5-c429-4e0f-ba11-bfb61badfc72.png",
  "/lovable-uploads/65a62939-dd10-4c6b-b41e-9be37c8636a8.png",
  "/lovable-uploads/35d3af99-e932-4ca2-89bf-7b180d43ea08.png",
  "/lovable-uploads/b72b9344-689b-48a7-9990-562dd63b9942.png",
  "/lovable-uploads/621fbc8f-1243-49b5-8655-9231de15957e.png",
  "/lovable-uploads/7378dcc0-60e4-4c3d-be52-08f05c443cb2.png",
  "/lovable-uploads/11dba437-2f1d-4fe6-90f7-5e6ca7e2b2c1.png",
  "/lovable-uploads/07fae02c-848c-440d-a76b-29f146f66e7c.png",
  "/lovable-uploads/d318f69c-a83b-4c27-be7c-fad26417a224.png",
  "/lovable-uploads/ba440401-d042-4384-95d7-a48b36262627.png",
  "/lovable-uploads/c933c249-c927-447f-8e72-a4c08a0764e9.png",
  "/lovable-uploads/ceb7c044-2aba-4809-a29d-5dc40e115c76.png",
  "/lovable-uploads/3a61898a-222f-4f13-bd6f-7ca84930e572.png",
  "/lovable-uploads/ef5dc348-7156-42a7-9513-15f29303d3a1.png",
  "/lovable-uploads/96fa73db-4bf4-4d7e-baed-d727e7e13018.png",
  "/lovable-uploads/91bcadf4-513b-4b83-9aef-d55bd824d765.png",
  "/lovable-uploads/99855f72-4756-484a-879e-6ea221a83975.png",
  "/lovable-uploads/2d3469f5-1eaa-46f6-9089-06c2e78c3240.png",
  "/lovable-uploads/5abca123-270d-475a-9c62-d4944faba46d.png",
  "/lovable-uploads/0c471415-8a15-489d-a149-89f1c3aed830.png",
  "/lovable-uploads/3c664e78-1098-4367-83ad-66727aa98286.png",
  "/lovable-uploads/c9d390cc-a3bf-41e2-9334-2721998dba97.png",
  "/lovable-uploads/907988a3-dd91-483c-ae79-7671727ab1de.png",
  "/lovable-uploads/749d82ca-9fc9-48f8-9bd6-01518ec65f75.png",
  "/lovable-uploads/8846b9ca-4136-464a-9587-24e9ff1c8a16.png",
  "/lovable-uploads/7353e455-d844-46b8-aea8-402d36b5e9a6.png",
  "/lovable-uploads/678e4e75-08eb-4384-9ca9-f93dd15bb2d5.png",
  "/lovable-uploads/a221b6f0-e57f-40fa-82d0-871114671cee.png",
  "/lovable-uploads/74983105-e4ac-4565-afdb-74501eb478ea.png",
  "/lovable-uploads/d22280ff-c479-4e7b-86d7-fe4514b9c6c7.png",
  "/lovable-uploads/a01acfa6-78f2-4456-8166-d127d076f379.png",
  "/lovable-uploads/ef541077-558e-40d5-85f7-bfa45752b851.png",
  "/lovable-uploads/94e818b9-d426-4de5-9d37-52c7ae750c5c.png",
  "/lovable-uploads/c83a2d59-4acc-41c9-a70b-699cd625f6da.png",
  "/lovable-uploads/d030482a-a9b0-4f21-b213-221a4dfa51ea.png",
  "/lovable-uploads/50ff4e74-b1a3-4070-bede-aed589f1914e.png",
  "/lovable-uploads/edeace1b-8506-427a-bcf8-bb241c5e8c27.png",
  "/lovable-uploads/9f5893ac-7dbc-4a11-8d47-2336ad132271.png",
  "/lovable-uploads/f7e962c9-e588-4461-8950-b9e6912aa6b7.png",
  "/lovable-uploads/33b607b4-c4a7-4f7c-b645-75ec3cbd1e18.png",
  "/lovable-uploads/57371b7f-7032-4106-a244-4e1ba727fd9f.png",
  "/lovable-uploads/1aa44320-7259-48f8-aed2-7f12680fb3aa.png",
  "/lovable-uploads/89a169e3-bd5e-4a77-87bf-c500b8a2cae7.png",
  "/lovable-uploads/18164387-a6cb-483c-9e57-5e741041c45b.png",
  "/lovable-uploads/b1550c69-47a3-4091-9986-850bbf9e8082.png",
  "/lovable-uploads/d2bc84c1-ba35-4b5f-a087-6d2b4d3f4f0e.png",
  "/lovable-uploads/d17f3a6b-9591-446a-ba95-cc94b28289df.png"
];

const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      <HeartBackground />
      <NavBar />
      <EasterEggHuntStatus />
      
      <header className="pt-32 pb-16 px-4 sm:px-6 text-center relative">
        <EasterEgg id="egg16" className="top-40 right-10" pattern={0} />
        <h1 className="text-5xl md:text-7xl font-allura mb-6 text-white animate-fade-in">
          Galería de Melanie
        </h1>
        <p className="text-xl md:text-2xl text-melanie-purple font-light max-w-2xl mx-auto animate-fade-in opacity-80">
          Cada imagen captura un momento de tu belleza eterna
        </p>
      </header>

      <section className="py-8 container mx-auto relative">
        <EasterEgg id="egg17" className="top-1/4 left-10" pattern={1} />
        <EasterEgg id="egg18" className="top-1/3 right-10" pattern={2} />
        <EasterEgg id="egg19" className="bottom-1/4 left-1/4" pattern={3} />
        <EasterEgg id="egg20" className="bottom-10 right-1/4" pattern={4} />
        
        <Gallery images={imageUrls} columnLayout={3} />
      </section>
    </div>
  );
};

export default GalleryPage;
