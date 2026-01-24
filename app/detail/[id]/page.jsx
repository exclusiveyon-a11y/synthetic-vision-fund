"use client";

import cards from "../../../data/cards";
import DetailHero from "../../../components/DetailHero";
import InvestPanel from "../../../components/InvestPanel";
import CheckoutFormWrapper from "../../../components/CheckoutFormWrapper";
import ProcessingModal from "../../../components/ProcessingModal";
import SuccessCard from "../../../components/SuccessCard";
import { useState, useEffect, useRef } from "react";
import { getStage, nextStage } from "../../../lib/growthStage";

export default function DetailPage({ params }) {
  const [step, setStep] = useState("default");
  const [stage, setStage] = useState(1);
  const [amount, setAmount] = useState(1000);

  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    const audio = mediaRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const updateProgress = () => {
    const audio = mediaRef.current;
    if (!audio || !audio.duration) return;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const audio = mediaRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = percent * audio.duration;
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const changeVolume = (e) => {
    const v = Number(e.target.value);
    const audio = mediaRef.current;
    if (!audio) return;
    audio.volume = v;
    setVolume(v);
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    const audio = mediaRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    setStage(getStage());
  }, []);

  const { id } = params;
  const item = cards.find((c) => c.id === id);
  const currentImage = item?.images?.[stage - 1] || item?.image;

  useEffect(() => {
    const audio = mediaRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [id]);

  if (!item) return <main className="svf-detail">404</main>;

  return (
    <main className="svf-detail" style={{ minHeight: "100vh" }}>
      <div className="svf-detail-body-grid">
        <div className="svf-detail-header" style={{ gridColumn: "1 / -1" }}>
          <h1 className="svf-detail-title">{item.title}</h1>
          <p className="svf-detail-episode">{item.episode}</p>
        </div>

        <div className="svf-detail-left">
          <DetailHero image={currentImage} />

          {item.audio && (
            <div className={`svf-player ${isPlaying ? "playing" : ""}`}>
              <div className="svf-player-info">
                <span className="svf-player-title">{item.title}</span>
              </div>
              <div className="svf-player-controls">
                <button onClick={togglePlay} className="svf-play-btn">
                  {isPlaying ? "❚❚" : "▶"}
                </button>
                <div className="svf-progress-wrap">
                  <div className="svf-progress" onClick={seek}>
                    <div className="svf-progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="svf-time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
              </div>
              <audio
                ref={mediaRef}
                src={item.audio}
                onTimeUpdate={updateProgress}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          )}

          <article className="svf-detail-story">
            <p>{item.description}</p>
          </article>
        </div>

        <div className="svf-detail-right">
          {step === "default" && (
            <InvestPanel
              invested={item.invested}
              supporters={item.supporters}
              marketcap={item.marketcap}
              ipo={item.ipo}
              amount={amount}
              setAmount={setAmount}
              onInvest={() => setStep("checkout")}
            />
          )}

          {step === "checkout" && (
            <CheckoutFormWrapper
              amount={amount}
              onSuccess={() => {
                if (stage === 3) {
                  setStep("processing");
                  const loop = setInterval(() => {
                    setStep((prev) => (prev === "processing" ? "success" : "processing"));
                  }, 2000);
                  return () => clearInterval(loop);
                } else {
                  setStep("processing");
                  setTimeout(() => {
                    setStage(nextStage());
                    setStep("success");
                  }, 3000);
                }
              }}
            />
          )}
        </div>
      </div>

      {(step === "processing" || step === "success") && (
        <div className="svf-overlay">
          <div className="svf-overlay-card">
            {step === "processing" ? (
              <ProcessingModal />
            ) : (
              <SuccessCard onGoBack={() => {
                setStage(nextStage());
                setStep("default");
              }} />
            )}
          </div>
        </div>
      )}
    </main>
  );
}