import React, { useState, useEffect } from 'react';
import {
  Shuffle,
  Award,
  Users,
  BookOpenCheck,
  Trophy,
  RotateCcw,
  ArrowRight,
  GithubIcon,
  Files,
} from 'lucide-react';
import ranks from './data/swiss-army-ranks.js';

const SwissArmyRanksApp = () => {
  const [mode, setMode] = useState('menu');
  const [gameMode, setGameMode] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // Pass & Play Mode
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerScores, setPlayerScores] = useState([]);
  const [roundsPerPlayer, setRoundsPerPlayer] = useState(5);
  const [totalRounds, setTotalRounds] = useState(0);

  // Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Testmode
  const [usedRanks, setUsedRanks] = useState<Rank[]>([]);

  // Translation
  const [language, setLanguage] = useState('de'); // 'de' oder 'fr'
  const getRankText = (rank, field) => {
    return rank[field][language] || rank[field].de;
  };

  const startGame = (curMode) => {
    curMode === 'test' ? setGameMode('test') : setGameMode('learning');
    setMode('game');
    setScore(0);
    setQuestionsAnswered(0);
    generateQuestion();
  };

  const startPassAndPlay = () => setMode('passplay-setup');

  const allGradesOverview = () => {
    setMode('all-grades-overview');
  };

  const startPassAndPlayGame = () => {
    if (players.length < 2) return;

    setGameMode('passplay');
    setMode('game');
    setPlayerScores(players.map((name) => ({ name, score: 0, answered: 0 })));
    setCurrentPlayerIndex(0);
    setTotalRounds(0);
    generateQuestion();
  };

  const addPlayer = () => {
    const playerName = prompt('Name des Spielers:');
    if (playerName && playerName.trim()) {
      setPlayers([...players, playerName.trim()]);
    }
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const generateQuestion = () => {
    let availableRanks = ranks;

    if (gameMode === 'test') {
      // Filter nur noch ungenutzte Ranks
      availableRanks = ranks.filter((r) => !usedRanks.includes(r));

      if (availableRanks.length === 0) {
        // Alle Ranks beantwortet -> Ergebnisse anzeigen
        setMode('results');
        return;
      }
    }

    const correctRank = availableRanks[Math.floor(Math.random() * availableRanks.length)];

    const wrongRanks = ranks
      .filter((r) => r.name !== correctRank.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [correctRank, ...wrongRanks].sort(() => Math.random() - 0.5);

    setCurrentQuestion(correctRank);
    setOptions(allOptions);
    setShowResult(false);
    setSelectedAnswer(null);

    if (gameMode === 'test') {
      setUsedRanks([...usedRanks, correctRank]);
    }
  };

  const handleAnswer = (selected: Rank) => {
    setSelectedAnswer(selected);
    const correct = selected.name === currentQuestion.name;
    setIsCorrect(correct);
    setShowResult(true);

    if (gameMode === 'learning') {
      if (correct) setScore(score + 1);
      setQuestionsAnswered(questionsAnswered + 1);
    } else if (gameMode === 'test') {
      setQuestionsAnswered(questionsAnswered + 1);

      // Direkt zur nächsten Frage springen
      setTimeout(() => {
        nextQuestion();
      }, 500); // optional: 500ms Delay, damit man kurz die richtige Antwort sehen kann
    } else if (gameMode === 'passplay') {
      const newScores = [...playerScores];
      if (correct) newScores[currentPlayerIndex].score += 1;
      newScores[currentPlayerIndex].answered += 1;
      setPlayerScores(newScores);
      setTotalRounds(totalRounds + 1);
    }
  };

  const nextQuestion = () => {
    if (gameMode === 'passplay') {
      const currentPlayer = playerScores[currentPlayerIndex];

      if (currentPlayer.answered >= roundsPerPlayer) {
        if (currentPlayerIndex < players.length - 1) {
          setCurrentPlayerIndex(currentPlayerIndex + 1);
        } else {
          setMode('results');
          return;
        }
      }
    }

    generateQuestion();
  };

  const resetGame = () => {
    setMode('menu');
    setScore(0);
    setQuestionsAnswered(0);
    setPlayers([]);
    setPlayerScores([]);
    setCurrentPlayerIndex(0);
  };

  if (mode === 'menu') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-4 flex items-center justify-center'>
        <button
          onClick={() => setLanguage(language === 'de' ? 'fr' : 'de')}
          className='fixed top-4 right-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 z-50'
        >
          <span className='text-xl'>{language === 'de' ? '🇩🇪' : '🇫🇷'}</span>
          <span>{language === 'de' ? 'DE' : 'FR'}</span>
        </button>

        <div className='max-w-md w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-2xl p-8'>
          <div className='text-center mb-8'>
            <div className='text-6xl mb-2'>
              <img
                src='https://prod-armeech-hcms-sdweb.imgix.net/2024/06/06/1d03d822-6ea2-475d-b3db-925d02aa9720.jpeg?auto=format'
                alt='img'
                className='inline-block h-36 w-64 object-contain'
              />
            </div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Schweizer Armee</h1>
            <p className='text-gray-600'>Grade Lern-Applikation</p>
          </div>

          <div className='space-y-4'>
            <button
              onClick={startGame}
              className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3'
            >
              <BookOpenCheck size={24} />
              <span>Lernmodus</span>
            </button>

            <button
              onClick={startGame.bind(null, 'test')}
              disabled={false}
              className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3'
            >
              <Award size={24} />
              <span>Testmodus</span>
            </button>

            <button
              onClick={startPassAndPlay}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3'
            >
              <Users size={24} />
              <span>Pass & Play</span>
            </button>

            <button
              onClick={allGradesOverview}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3'
            >
              <Files size={24} />
              <span>Alle Grade</span>
            </button>
          </div>

          <div className='mt-8 text-center text-md text-gray-500'>
            <p>Lerne alle {ranks.length} Armeegrade</p>
            <span className='text-xs text-gray-400 mt-4'>
              Entwickelt von A. Marro - v2.0{' '}
              <button
                onClick={() =>
                  window.open('https://github.com/AndrasMarro/ArmeeGradeTrainer', '_blank')
                }
              >
                <GithubIcon className='mx-auto text-gray-500' size={18} />
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'passplay-setup') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-4 flex items-center justify-center'>
        <div className='max-w-md w-full bg-white rounded-2xl shadow-2xl p-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Pass & Play Setup</h2>

          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Fragen pro Spieler:
            </label>
            <input
              type='number'
              min='3'
              max='20'
              value={roundsPerPlayer}
              onChange={(e) => setRoundsPerPlayer(parseInt(e.target.value) || 5)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <div className='mb-6'>
            <div className='flex justify-between items-center mb-3'>
              <label className='text-sm font-medium text-gray-700'>
                Spieler ({players.length})
              </label>
              <button
                onClick={addPlayer}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm font-medium'
              >
                + Hinzufügen
              </button>
            </div>

            <div className='space-y-2 max-h-48 overflow-y-auto'>
              {players.map((player, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center bg-green-200 px-4 py-2 rounded-lg'
                >
                  <span className='font-medium text-gray-700'>{player}</span>
                  <button
                    onClick={() => removePlayer(index)}
                    className='text-red-500 hover:text-red-700 font-bold'
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {players.length < 2 && (
              <p className='text-sm text-amber-600 mt-2'>Mindestens 2 Spieler erforderlich</p>
            )}
          </div>

          <div className='space-y-3'>
            <button
              onClick={startPassAndPlayGame}
              disabled={players.length < 2}
              className={`w-full font-semibold py-3 px-6 rounded-xl shadow-lg transition-all ${
                players.length >= 2
                  ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Spiel starten
            </button>

            <button
              onClick={resetGame}
              className='w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all'
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'game') {
    const currentPlayer = gameMode === 'passplay' ? playerScores[currentPlayerIndex] : null;

    return (
      <div className='min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-4'>
        <div className='max-w-2xl mx-auto'>
          {/* Header */}
          <div className='bg-red-100 rounded-t-2xl p-4 shadow-lg'>
            <div className='flex justify-between items-center'>
              <div>
                <button
                  onClick={resetGame}
                  className='bg-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg'
                >
                  Zurück
                </button>

                {(gameMode === 'test' || gameMode === 'passplay') && (
                  <button
                    onClick={() => setMode('results')}
                    className='bg-red-500 text-white font-semibold py-2 px-3 ml-2 rounded-xl shadow-lg'
                  >
                    surrender
                  </button>
                )}
              </div>

              {gameMode === 'learning' ? (
                <div className='text-center mr-4'>
                  <p className='text-2xl font-bold text-green-600'>
                    {score} <span className='text-xs text-green-600'>richtig</span>
                  </p>
                  <p className='text-xs text-gray-500'>von {questionsAnswered}</p>
                </div>
              ) : gameMode === 'test' ? (
                <div className='text-center mr-4'>
                  <p className='text-2xl font-bold text-red-600'>{questionsAnswered}</p>
                </div>
              ) : (
                <div className='text-center'>
                  <p className='font-bold text-blue-600'>{currentPlayer?.name}</p>
                  <p className='text-sm text-gray-600'>
                    {currentPlayer?.score} / {currentPlayer?.answered}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Question Card */}
          <div className='bg-white p-8 shadow-2'>
            <div className='text-center p-2 border-2 rounded-xl mb-4'>
              <p className='text-gray-600 mb-4'>Welcher Grad ist das?</p>

              {/* Gradabzeichen Image */}
              <div className='flex justify-center items-center mb-4 min-h-32 '>
                {currentQuestion?.image ? (
                  <img
                    src={currentQuestion.image}
                    alt='Gradabzeichen'
                    className='max-h-32 object-contain rounded-lg border-2 shadow-xl'
                  />
                ) : (
                  <div className='bg-gray-100 px-8 py-16 rounded-lg'>
                    <p className='text-gray-400 text-sm'>Kein Abzeichen</p>
                  </div>
                )}
              </div>

              <p className='text-sm text-gray-500 italic'>
                {language === 'de' ? currentQuestion.category.de : currentQuestion.category.fr}
              </p>
            </div>

            {/* Options */}
            <div className='grid grid-cols-1 gap-3 mb-4'>
              {options.map((option, index) => {
                const isSelected = selectedAnswer?.name.de === option.name.de;
                const isCorrectAnswer = option.name.de === currentQuestion.name.de;

                let buttonClass =
                  'bg-gray-300 hover:bg-blue-100 text-gray-800 hover:shadow-md transform hover:scale-102';

                if (showResult) {
                  if (gameMode === 'test') {
                    // In test mode: neutral style, no green/red feedback
                    buttonClass = isSelected
                      ? 'bg-blue-200 text-gray-800'
                      : 'bg-gray-300 text-gray-400';
                  } else {
                    // Normal feedback (learning/game mode)
                    buttonClass = isCorrectAnswer
                      ? 'bg-green-500 text-white'
                      : isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-300 text-gray-400';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswer(option)}
                    disabled={showResult}
                    className={`p-3 rounded-xl font-semibold text-md transition-all ${buttonClass}`}
                  >
                    {language === 'de' ? option.name.de : option.name.fr}
                  </button>
                );
              })}
            </div>

            {/* Result Feedback — hidden in test mode */}
            {showResult && gameMode !== 'test' && (
              <div
                className={`p-3 rounded-xl mb-4 w-48 mx-auto ${
                  isCorrect ? 'bg-green-300' : 'bg-red-100'
                }`}
              >
                <p
                  className={`font-bold text-center text-sm ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {isCorrect ? '✓ Richtig!' : '✗ Falsch!'}
                </p>
                {!isCorrect && (
                  <p className='text-center text-sm text-gray-700 mt-2'>
                    Richtige Antwort: <strong>{currentQuestion.name.de}</strong>
                  </p>
                )}
              </div>
            )}

            {/* Next Button */}
            {showResult && gameMode !== 'test' && (
              <button
                onClick={nextQuestion}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2'
              >
                <span>Weiter</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>

          {/* Progress for Pass & Play */}
          {gameMode === 'passplay' && (
            <div className='bg-white rounded-b-2xl px-4 pb-4 shadow-lg'>
              <div className='flex justify-between text-sm text-gray-600'>
                {playerScores.map((player, index) => (
                  <div
                    key={index}
                    className={`text-center ${
                      index === currentPlayerIndex ? 'font-bold text-blue-600' : ''
                    }`}
                  >
                    <p>{player.name}</p>
                    <p className='text-xs'>
                      {player.answered}/{roundsPerPlayer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'results') {
    if (gameMode === 'passplay') {
      const sortedScores = [...playerScores].sort((a, b) => b.score - a.score);
      const winner = sortedScores[0];

      return (
        <div className='min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-4 flex items-center justify-center'>
          <div className='max-w-md w-full bg-white rounded-2xl shadow-2xl p-8'>
            <div className='text-center mb-6'>
              <Trophy className='mx-auto text-yellow-500 mb-4' size={64} />
              <h2 className='text-3xl font-bold text-gray-800 mb-2'>Spielende!</h2>
              <p className='text-xl text-gray-600'>Gewinner: {winner.name}</p>
            </div>

            <div className='space-y-3 mb-6'>
              {sortedScores.map((player, index) => (
                <div
                  key={index}
                  className='bg-gray-200 rounded-lg p-4 flex justify-between items-center'
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-2xl font-bold text-gray-400'>#{index + 1}</span>
                    <span className='font-semibold text-gray-800'>{player.name}</span>
                  </div>
                  <div className='text-right'>
                    <p className='text-2xl font-bold text-blue-600'>{player.score}</p>
                    <p className='text-xs text-gray-500'>von {player.answered}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={resetGame}
              className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105'
            >
              Zurück zum Menü
            </button>
          </div>
        </div>
      );
    } else if (gameMode === 'test') {
      return (
        <div className='min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-4 flex items-center justify-center'>
          <div className='max-w-md w-full bg-white rounded-2xl shadow-2xl p-8'>
            <div className='text-center mb-6'>
              <Trophy className='mx-auto text-yellow-500 mb-4' size={64} />
              <h2 className='text-3xl font-bold text-gray-800 mb-2'>Test beendet!</h2>
              <p className='text-xl text-gray-600'>
                Du hast <span className='font-bold text-red-800'>{score}</span> von{' '}
                <span className='font-bold text-green-600'>{questionsAnswered}</span> Fragen richtig
                beantwortet.
              </p>
            </div>

            <button
              onClick={resetGame}
              className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105'
            >
              Zurück zum Menü
            </button>
          </div>
        </div>
      );
    }
  }

  if (mode === 'all-grades-overview') {
    // Filtere die Ränge basierend auf der Sucheingabe
    const filteredRanks = ranks.filter(
      (rank) =>
        getRankText(rank, 'name').toLowerCase().includes(searchQuery.toLowerCase()) ||
        getRankText(rank, 'category').toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
      <div className='min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-800 p-4'>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8'>
          <div className='flex justify-between items-center'>
            <button
              onClick={resetGame}
              className='bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg'
            >
              Zurück
            </button>
            <h1 className='bg-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg'>
              {filteredRanks.length} von {ranks.length} Grade
            </h1>
          </div>

          <h2 className='text-3xl font-bold text-center text-gray-800 mb-6 mt-4'>
            Alle Armeegrade
          </h2>

          {/* Suchfeld */}
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Suche nach Grad oder Kategorie...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 text-lg'
            />
          </div>

          <hr className='my-4 border-gray-300' />

          {filteredRanks.length === 0 ? (
            <p className='text-center text-gray-500 py-8'>
              Keine Grade gefunden für "{searchQuery}"
            </p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredRanks.map((rank, index) => (
                <div
                  key={index}
                  className='bg-gradient-to-br from-blue-200 via-blue-150 to-blue-100 rounded-lg p-4 flex flex-col items-center shadow-md'
                >
                  {rank.image ? (
                    <img
                      src={rank.image}
                      alt={getRankText(rank, 'name')}
                      className='h-24 object-contain mb-4 rounded-lg shadow-lg'
                    />
                  ) : (
                    <div className='h-24 mb-4 rounded-lg shadow-lg bg-gray-200 flex items-center justify-center'>
                      <span className='text-gray-400 mx-2'>Kein Bild verfügbar</span>
                    </div>
                  )}
                  <h3 className='text-md text-gray-400 italic'>{getRankText(rank, 'category')}</h3>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {getRankText(rank, 'name')}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default SwissArmyRanksApp;
