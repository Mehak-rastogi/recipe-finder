.search-page {
  min-height: 70vh;
  padding-bottom: 88px;
  color: #20392a;
  background: #fbfaf6;
}

.search-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1280px, calc(100% - 80px));
  min-height: 315px;
  margin: 0 auto;
  padding: 42px clamp(28px, 6vw, 84px);
  overflow: hidden;
  color: #fffdf5;
  background: #164c36;
  border-radius: 0 0 34px 34px;
  box-sizing: border-box;
}

.search-hero::after {
  position: absolute;
  right: -95px;
  bottom: -225px;
  width: 470px;
  height: 470px;
  border: 1px solid rgba(222, 241, 135, 0.22);
  border-radius: 50%;
  box-shadow: 0 0 0 34px rgba(222, 241, 135, 0.055), 0 0 0 72px rgba(222, 241, 135, 0.045);
  content: "";
}

.search-hero-copy {
  position: relative;
  z-index: 1;
  max-width: 650px;
}

.search-eyebrow,
.search-section-kicker {
  display: inline-block;
  color: #d8ed72;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.search-hero h1 {
  margin: 15px 0 12px;
  font-size: clamp(40px, 5.2vw, 68px);
  line-height: 1.04;
  letter-spacing: -0.06em;
}

.search-hero h1 em {
  color: #d8ed72;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 500;
}

.search-hero p {
  margin: 0;
  color: rgba(255, 253, 245, 0.78);
  font-size: 15px;
  line-height: 1.7;
}

.search-hero-mark {
  position: relative;
  z-index: 1;
  display: grid;
  width: clamp(112px, 17vw, 190px);
  height: clamp(112px, 17vw, 190px);
  flex: 0 0 auto;
  place-items: center;
  color: #d8ed72;
  background: rgba(240, 247, 213, 0.08);
  border: 1px solid rgba(240, 247, 213, 0.2);
  border-radius: 50%;
  font-size: clamp(62px, 9vw, 110px);
  line-height: 1;
  transform: rotate(-10deg);
}

.search-content {
  width: min(1120px, calc(100% - 80px));
  margin: 60px auto 0;
}

.search-toolbar {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 26px;
  margin-bottom: 26px;
}

.search-section-kicker {
  color: #718274;
  font-size: 10px;
}

.search-toolbar h2 {
  margin: 9px 0 0;
  color: #20392a;
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.15;
}

.search-toolbar h2 span {
  color: #497344;
}

.search-page-form {
  width: min(350px, 42%);
  flex: 0 0 auto;
}

.search-results-count {
  margin-bottom: 16px;
  color: #788479;
  font-size: 13px;
  font-weight: 600;
}

.search-recipe-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.search-recipe-card {
  min-width: 0;
  padding: 0;
  overflow: hidden;
  color: inherit;
  text-align: left;
  background: #fff;
  border: 1px solid rgba(32, 57, 42, 0.08);
  border-radius: 18px;
  box-shadow: 0 7px 24px rgba(36, 52, 39, 0.045);
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.search-recipe-card:hover {
  box-shadow: 0 16px 32px rgba(36, 52, 39, 0.13);
  transform: translateY(-4px);
}

.search-recipe-image {
  position: relative;
  aspect-ratio: 1.32;
  overflow: hidden;
  background: #e9eddf;
}

.search-recipe-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 260ms ease;
}

.search-recipe-card:hover .search-recipe-image img {
  transform: scale(1.045);
}

.search-time-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 7px 11px;
  color: #234a34;
  background: rgba(255, 253, 244, 0.95);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.search-image-placeholder {
  height: 100%;
  display: grid;
  place-items: center;
  color: #65735e;
}

.search-recipe-content {
  min-height: 114px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 17px;
}

.search-recipe-content h3 {
  display: -webkit-box;
  margin: 0 0 16px;
  overflow: hidden;
  color: #263a2c;
  font-size: 15px;
  font-weight: 750;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.search-card-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #55744a;
  font-size: 12px;
  font-weight: 700;
}

.search-feedback {
  padding: 22px 0;
  color: #657569;
  font-size: 14px;
}

.search-feedback-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: #f1f3e9;
  border: 1px solid rgba(21, 67, 47, 0.08);
  border-radius: 18px;
}

.search-feedback-icon {
  width: 42px;
  height: 42px;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  color: #315a3b;
  background: #e0e9ca;
  border-radius: 50%;
  font-size: 22px;
  font-weight: 700;
}

.search-feedback-card h3 {
  margin: 0 0 5px;
  color: #20392a;
  font-size: 16px;
}

.search-feedback-card p {
  margin: 0;
  color: #657569;
  font-size: 13px;
  line-height: 1.55;
}

@media (max-width: 960px) {
  .search-recipe-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }
}

@media (max-width: 700px) {
  .search-hero {
    width: calc(100% - 32px);
    min-height: 280px;
    padding: 38px 25px;
    border-radius: 0 0 26px 26px;
  }

  .search-hero-mark {
    position: absolute;
    right: 18px;
    bottom: 20px;
    width: 88px;
    height: 88px;
    font-size: 54px;
    opacity: 0.7;
  }

  .search-hero-copy {
    max-width: 100%;
  }

  .search-hero h1 {
    font-size: clamp(39px, 9vw, 54px);
  }

  .search-hero p {
    max-width: 300px;
    font-size: 14px;
  }

  .search-content {
    width: calc(100% - 40px);
    margin-top: 42px;
  }

  .search-toolbar {
    align-items: stretch;
    flex-direction: column;
    gap: 17px;
  }

  .search-page-form {
    width: 100%;
  }

  .search-recipe-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .search-recipe-content {
    min-height: 108px;
    padding: 13px;
  }

  .search-recipe-content h3 {
    font-size: 13px;
  }
}

@media (max-width: 380px) {
  .search-hero {
    width: calc(100% - 24px);
    padding: 32px 20px;
  }

  .search-content {
    width: calc(100% - 32px);
  }

  .search-recipe-grid {
    gap: 10px;
  }

  .search-recipe-content {
    padding: 11px;
  }
}
