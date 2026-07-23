/**
 * Cash Lab — Solo cashflow board game (Classic-inspired rules).
 * Original educational game for VaultOne. Not affiliated with Rich Dad / CASHFLOW.
 */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'vaultone_cashlab_save_v1';
  const $ = (n) => {
    const v = Math.round(Number(n) || 0);
    const sign = v < 0 ? '-' : '';
    return sign + '$' + Math.abs(v).toLocaleString('en-US');
  };

  const PROFESSIONS = [
    { id: 'engineer', title: 'Engineer', salary: 4900, taxes: 1050, mortgage: 700, school: 60, car: 220, credit: 140, retail: 50, other: 1090, childCost: 240, savings: 400, liabilities: { mortgage: 75000, school: 12000, car: 7000, credit: 4000, retail: 1000 } },
    { id: 'teacher', title: 'Teacher', salary: 3300, taxes: 630, mortgage: 400, school: 0, car: 100, credit: 80, retail: 50, other: 890, childCost: 200, savings: 400, liabilities: { mortgage: 50000, school: 0, car: 5000, credit: 3000, retail: 1000 } },
    { id: 'nurse', title: 'Nurse', salary: 3100, taxes: 600, mortgage: 400, school: 30, car: 100, credit: 90, retail: 50, other: 1030, childCost: 200, savings: 480, liabilities: { mortgage: 50000, school: 6000, car: 5000, credit: 3000, retail: 1000 } },
    { id: 'mechanic', title: 'Mechanic', salary: 2000, taxes: 360, mortgage: 300, school: 0, car: 60, credit: 60, retail: 50, other: 670, childCost: 140, savings: 670, liabilities: { mortgage: 31000, school: 0, car: 3000, credit: 2000, retail: 1000 } },
    { id: 'secretary', title: 'Secretary', salary: 2500, taxes: 460, mortgage: 400, school: 0, car: 80, credit: 80, retail: 50, other: 570, childCost: 170, savings: 710, liabilities: { mortgage: 46000, school: 0, car: 4000, credit: 3000, retail: 1000 } },
    { id: 'police', title: 'Police Officer', salary: 3000, taxes: 580, mortgage: 400, school: 0, car: 100, credit: 60, retail: 50, other: 690, childCost: 210, savings: 520, liabilities: { mortgage: 46000, school: 0, car: 5000, credit: 2000, retail: 1000 } },
    { id: 'janitor', title: 'Janitor', salary: 1600, taxes: 280, mortgage: 200, school: 0, car: 60, credit: 60, retail: 50, other: 300, childCost: 140, savings: 560, liabilities: { mortgage: 20000, school: 0, car: 4000, credit: 2000, retail: 1000 } },
    { id: 'lawyer', title: 'Lawyer', salary: 7500, taxes: 1830, mortgage: 1100, school: 390, car: 260, credit: 270, retail: 50, other: 2150, childCost: 380, savings: 2000, liabilities: { mortgage: 135000, school: 48000, car: 11000, credit: 9000, retail: 1000 } },
    { id: 'doctor', title: 'Doctor', salary: 13200, taxes: 3420, mortgage: 1900, school: 750, car: 380, credit: 270, retail: 50, other: 2880, childCost: 640, savings: 4000, liabilities: { mortgage: 202000, school: 150000, car: 19000, credit: 10000, retail: 1000 } },
    { id: 'pilot', title: 'Airline Pilot', salary: 9500, taxes: 2350, mortgage: 1300, school: 0, car: 300, credit: 270, retail: 50, other: 2560, childCost: 400, savings: 400, liabilities: { mortgage: 143000, school: 0, car: 12000, credit: 9000, retail: 1000 } },
    { id: 'manager', title: 'Business Manager', salary: 4600, taxes: 910, mortgage: 700, school: 60, car: 120, credit: 120, retail: 50, other: 1000, childCost: 300, savings: 400, liabilities: { mortgage: 75000, school: 12000, car: 6000, credit: 4000, retail: 1000 } },
    { id: 'truck', title: 'Truck Driver', salary: 2500, taxes: 460, mortgage: 400, school: 0, car: 80, credit: 60, retail: 50, other: 870, childCost: 200, savings: 750, liabilities: { mortgage: 38000, school: 0, car: 4000, credit: 2000, retail: 1000 } }
  ];

  const BOARD = [
    { type: 'payday', label: 'PAYDAY' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'doodad', label: 'Doodad' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'market', label: 'Market' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'charity', label: 'Charity' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'doodad', label: 'Doodad' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'payday', label: 'PAYDAY' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'baby', label: 'Baby' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'market', label: 'Market' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'doodad', label: 'Doodad' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'downsized', label: 'Downsized' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'payday', label: 'PAYDAY' },
    { type: 'opportunity', label: 'Opportunity' },
    { type: 'market', label: 'Market' },
    { type: 'opportunity', label: 'Opportunity' }
  ];

  const FAST_BOARD = [
    { type: 'ft_cash', label: 'Cash Flow Day', amount: 1 },
    { type: 'ft_deal', label: 'Fast Deal' },
    { type: 'ft_charity', label: 'Charity' },
    { type: 'ft_deal', label: 'Fast Deal' },
    { type: 'ft_cash', label: 'Cash Flow Day', amount: 1 },
    { type: 'ft_deal', label: 'Fast Deal' },
    { type: 'ft_tax', label: 'Tax Audit', amount: 0.5 },
    { type: 'ft_deal', label: 'Fast Deal' },
    { type: 'ft_cash', label: 'Cash Flow Day', amount: 1 },
    { type: 'ft_deal', label: 'Fast Deal' },
    { type: 'ft_divorce', label: 'Divorce!', amount: 0.5 },
    { type: 'ft_deal', label: 'Fast Deal' },
    { type: 'ft_cash', label: 'Cash Flow Day', amount: 1 },
    { type: 'ft_deal', label: 'Fast Deal' },
    { type: 'ft_lawsuit', label: 'Lawsuit', amount: 0.5 },
    { type: 'ft_deal', label: 'Fast Deal' },
    { type: 'ft_cash', label: 'Cash Flow Day', amount: 1 },
    { type: 'ft_deal', label: 'Fast Deal' }
  ];

  const DREAMS = [
    { id: 'villa', title: 'Beach Villa', cost: 300000, desc: 'Your dream coastal home.' },
    { id: 'yacht', title: 'Private Yacht', cost: 250000, desc: 'Sail anywhere you want.' },
    { id: 'jet', title: 'Private Jet Share', cost: 500000, desc: 'Skip commercial forever.' },
    { id: 'island', title: 'Private Island', cost: 1000000, desc: 'Your own paradise.' },
    { id: 'foundation', title: 'Charity Foundation', cost: 400000, desc: 'Give back at scale.' },
    { id: 'ranch', title: 'Mountain Ranch', cost: 350000, desc: 'Wide open freedom.' }
  ];

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function makeSmallDeals() {
    const stocks = [
      ['OK Oil', 10, 1], ['MYT4U Electronics', 20, 1], ['GRO4US Food Co', 15, 0],
      ['OK Oil', 25, 1], ['MYT4U Electronics', 10, 0], ['GRO4US Food Co', 30, 1],
      ['OK Oil', 5, 0], ['MYT4U Electronics', 40, 2], ['GRO4US Food Co', 10, 0]
    ].map(([name, price, cf], i) => ({
      id: `ss${i}`, kind: 'stock', title: `${name} Stock`,
      desc: `Buy shares of ${name}.`, cost: price * 100, shares: 100, price, cashflow: cf * 100,
      symbol: name.split(' ')[0], sellRange: [price - 10, price + 40]
    }));
    const houses = [
      { title: 'Condo — 2BR/1BA', cost: 45000, down: 5000, mortgage: 40000, cashflow: 100 },
      { title: 'House — 3BR/2BA', cost: 65000, down: 8000, mortgage: 57000, cashflow: 160 },
      { title: 'Duplex', cost: 80000, down: 10000, mortgage: 70000, cashflow: 250 },
      { title: 'House — 2BR/1BA', cost: 50000, down: 5000, mortgage: 45000, cashflow: 80 },
      { title: 'Condo — 1BR', cost: 35000, down: 4000, mortgage: 31000, cashflow: 50 },
      { title: 'Triplex', cost: 120000, down: 15000, mortgage: 105000, cashflow: 400 },
      { title: 'House — Fixer Upper', cost: 40000, down: 5000, mortgage: 35000, cashflow: -50 },
      { title: '4-plex', cost: 160000, down: 20000, mortgage: 140000, cashflow: 500 }
    ].map((h, i) => ({ id: `sh${i}`, kind: 're', ...h, desc: `Residential rental. Down ${$(h.down)}. Mortgage ${$(h.mortgage)}.` }));
    const biz = [
      { title: 'Car Wash Partnership', cost: 3000, cashflow: 250, desc: 'Small service business stake.' },
      { title: 'Automated Car Wash Share', cost: 5000, cashflow: 400, desc: 'Passive wash income.' },
      { title: 'Pizza Franchise Slice', cost: 4000, cashflow: 300, desc: 'Local franchise share.' },
      { title: 'Laundromat Unit', cost: 2000, cashflow: 150, desc: 'Coin laundry income.' }
    ].map((b, i) => ({ id: `sb${i}`, kind: 'biz', ...b }));
    return shuffle([...stocks, ...houses, ...biz]);
  }

  function makeBigDeals() {
    const deals = [
      { title: 'Apartment Complex (12 units)', cost: 350000, down: 50000, mortgage: 300000, cashflow: 1800 },
      { title: 'Apartment Complex (24 units)', cost: 700000, down: 100000, mortgage: 600000, cashflow: 3500 },
      { title: 'Apartment Complex (48 units)', cost: 1200000, down: 200000, mortgage: 1000000, cashflow: 6500 },
      { title: 'Office Building', cost: 450000, down: 75000, mortgage: 375000, cashflow: 2200 },
      { title: 'Bed & Breakfast', cost: 250000, down: 40000, mortgage: 210000, cashflow: 1200 },
      { title: 'Mini Storage', cost: 300000, down: 40000, mortgage: 260000, cashflow: 900 },
      { title: 'Car Dealership Land Lease', cost: 200000, down: 30000, mortgage: 170000, cashflow: 1500 },
      { title: 'Franchise Business', cost: 150000, down: 50000, mortgage: 100000, cashflow: 2000 },
      { title: 'Industrial Warehouse', cost: 400000, down: 60000, mortgage: 340000, cashflow: 1600 },
      { title: 'Shopping Plaza Share', cost: 500000, down: 80000, mortgage: 420000, cashflow: 2800 },
      { title: '8-Unit Apartment', cost: 280000, down: 40000, mortgage: 240000, cashflow: 1400 },
      { title: 'Mobile Home Park', cost: 320000, down: 45000, mortgage: 275000, cashflow: 1700 }
    ];
    return shuffle(deals.map((d, i) => ({
      id: `bd${i}`, kind: 're', ...d,
      desc: `Big opportunity. Down ${$(d.down)}. Mortgage ${$(d.mortgage)}. Cashflow ${$(d.cashflow)}/mo.`
    })));
  }

  function makeMarket() {
    const cards = [
      { title: 'Real Estate Boom', match: 're', priceBonus: 20000, desc: 'Buyers everywhere. Sell rentals for +$20,000 over basis.' },
      { title: 'Housing Soft', match: 're', priceBonus: -10000, desc: 'Market cools. Sell rentals for −$10,000 vs basis.' },
      { title: 'Stock Split Buzz', match: 'stock', price: 40, symbol: null, desc: 'Tech rally — sell any stock at $40/share.' },
      { title: 'Oil Spike', match: 'stock', price: 45, symbol: 'OK', desc: 'OK Oil hits $45/share. Sell OK Oil if you own it.' },
      { title: 'Electronics Surge', match: 'stock', price: 50, symbol: 'MYT4U', desc: 'MYT4U hits $50/share.' },
      { title: 'Food Co Rally', match: 'stock', price: 35, symbol: 'GRO4US', desc: 'GRO4US hits $35/share.' },
      { title: 'Market Crash Stocks', match: 'stock', price: 5, symbol: null, desc: 'Panic selling — stocks dump to $5/share.' },
      { title: 'Condo Craze', match: 're', titleFilter: 'Condo', priceBonus: 15000, desc: 'Condos hot. +$15,000 on condo sales.' },
      { title: 'Apartment Demand', match: 're', titleFilter: 'Apartment', priceBonus: 50000, desc: 'Apartment buyers pay +$50,000.' },
      { title: 'Business Buyer', match: 'biz', priceBonus: 5000, desc: 'Acquirer offers +$5,000 over cost for small businesses.' },
      { title: 'Inflation Scare', match: 're', priceBonus: -15000, desc: 'Rates spike. RE −$15,000 on sale.' },
      { title: 'RE Boom Deluxe', match: 're', priceBonus: 40000, desc: 'Hot market. RE +$40,000 on sale.' }
    ];
    return shuffle(cards.map((c, i) => ({ id: `m${i}`, ...c })));
  }

  function makeDoodads() {
    return shuffle([
      { title: 'New TV', cost: 1200 }, { title: 'Boat Toys', cost: 1000 },
      { title: 'Furniture Set', cost: 1500 }, { title: 'Golf Clubs', cost: 800 },
      { title: 'New Clothes', cost: 400 }, { title: 'Concert Tickets', cost: 300 },
      { title: 'Car Stereo', cost: 700 }, { title: 'Family Vacation', cost: 2000 },
      { title: 'Big Screen Upgrade', cost: 2500 }, { title: 'Kitchen Remodel Bits', cost: 1800 },
      { title: 'Sports Tickets', cost: 500 }, { title: 'Phone Upgrade', cost: 600 },
      { title: 'Shopping Spree', cost: 900 }, { title: 'Hobby Gear', cost: 750 },
      { title: 'Birthday Party', cost: 450 }
    ].map((d, i) => ({ id: `dd${i}`, ...d, desc: `You bought it. Pay ${$(d.cost)}.` })));
  }

  function makeFastDeals() {
    return shuffle([
      { title: 'Tech IPO Stake', cost: 50000, cashflow: 5000 },
      { title: 'Oil Field Royalty', cost: 80000, cashflow: 8000 },
      { title: 'International Franchise', cost: 120000, cashflow: 12000 },
      { title: 'Biotech Patent Share', cost: 100000, cashflow: 9000 },
      { title: 'Skyline Tower Floor', cost: 200000, cashflow: 15000 },
      { title: 'Shipping Fleet Slice', cost: 150000, cashflow: 11000 },
      { title: 'Data Center Unit', cost: 175000, cashflow: 14000 },
      { title: 'Resort Partnership', cost: 250000, cashflow: 20000 },
      { title: 'Solar Farm Share', cost: 90000, cashflow: 7000 },
      { title: 'Private Equity Slice', cost: 300000, cashflow: 25000 }
    ].map((d, i) => ({
      id: `fd${i}`, kind: 'ft', ...d,
      desc: `Fast Track deal. Cost ${$(d.cost)}. Cashflow ${$(d.cashflow)}/mo.`
    })));
  }

  function freshDecks() {
    return {
      small: makeSmallDeals(),
      big: makeBigDeals(),
      market: makeMarket(),
      doodad: makeDoodads(),
      fast: makeFastDeals()
    };
  }

  function drawFrom(decks, key) {
    if (!decks[key].length) {
      if (key === 'small') decks.small = makeSmallDeals();
      else if (key === 'big') decks.big = makeBigDeals();
      else if (key === 'market') decks.market = makeMarket();
      else if (key === 'doodad') decks.doodad = makeDoodads();
      else if (key === 'fast') decks.fast = makeFastDeals();
    }
    return decks[key].pop();
  }

  function createPlayer(prof) {
    return {
      professionId: prof.id,
      title: prof.title,
      salary: prof.salary,
      taxes: prof.taxes,
      mortgagePay: prof.mortgage,
      schoolPay: prof.school,
      carPay: prof.car,
      creditPay: prof.credit,
      retailPay: prof.retail,
      other: prof.other,
      childCost: prof.childCost,
      children: 0,
      cash: prof.savings,
      liabilities: { ...prof.liabilities, bankLoan: 0 },
      assets: [],
      position: 0,
      charityTurns: 0,
      skippedPayday: false,
      phase: 'rat', // rat | fast
      dreamId: null,
      dreamPaid: false,
      turns: 0
    };
  }

  function totalExpenses(p) {
    return p.taxes + p.mortgagePay + p.schoolPay + p.carPay + p.creditPay + p.retailPay + p.other
      + (p.children * p.childCost)
      + Math.ceil((p.liabilities.bankLoan || 0) * 0.1);
  }

  function passiveIncome(p) {
    return (p.assets || []).reduce((s, a) => s + (a.cashflow || 0), 0);
  }

  function totalIncome(p) {
    return p.salary + passiveIncome(p);
  }

  function monthlyCashflow(p) {
    return totalIncome(p) - totalExpenses(p);
  }

  function hasEscaped(p) {
    return passiveIncome(p) > totalExpenses(p);
  }

  function assetBasis(a) {
    if (a.kind === 'stock') return (a.price || 0) * (a.shares || 0);
    return a.cost || a.down || 0;
  }

  class CashLabGame {
    constructor(host, opts = {}) {
      this.host = host;
      this.onExit = opts.onExit || (() => {});
      this.state = null;
      this.modal = null;
      this.log = [];
      this.loadOrMenu();
    }

    loadOrMenu() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          this.state = JSON.parse(raw);
          if (this.state?.player) {
            this.render();
            return;
          }
        }
      } catch (_) {}
      this.state = null;
      this.renderMenu();
    }

    save() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); } catch (_) {}
    }

    clearSave() {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
    }

    pushLog(msg) {
      this.log.unshift({ t: Date.now(), msg });
      this.log = this.log.slice(0, 40);
    }

    startNew() {
      this.clearSave();
      this.state = { screen: 'profession', decks: freshDecks(), player: null };
      this.log = [];
      this.render();
    }

    pickProfession(id) {
      const prof = PROFESSIONS.find(p => p.id === id);
      if (!prof) return;
      this.state.player = createPlayer(prof);
      this.state.screen = 'play';
      this.state.awaitingRoll = true;
      this.pushLog(`You are a ${prof.title}. Goal: Passive Income > Expenses.`);
      this.save();
      this.render();
    }

    rollDie() {
      return 1 + Math.floor(Math.random() * 6);
    }

    diceCount() {
      const p = this.state.player;
      if (p.charityTurns > 0) return 'choice';
      return 1;
    }

    beginTurn() {
      const p = this.state.player;
      if (p.phase === 'fast' && p.dreamPaid) {
        this.openModal({
          title: 'You Win!',
          body: `<p>You bought your dream and built lasting cashflow. Financial freedom unlocked.</p>`,
          actions: [{ label: 'New Game', primary: true, fn: () => this.startNew() }]
        });
        return;
      }
      this.state.awaitingRoll = true;
      this.state.pendingDice = this.diceCount();
      this.render();
    }

    doRoll(forcedDice) {
      const p = this.state.player;
      if (!this.state.awaitingRoll) return;
      let dice = forcedDice || 1;
      if (p.charityTurns > 0 && !forcedDice) {
        this.openModal({
          title: 'Charity Dice',
          body: '<p>You have Charity active. Choose 1 or 2 dice.</p>',
          actions: [
            { label: 'Roll 1', primary: true, fn: () => this.doRoll(1) },
            { label: 'Roll 2', primary: true, fn: () => this.doRoll(2) }
          ]
        });
        return;
      }
      this.state.awaitingRoll = false;
      let total = 0;
      const rolls = [];
      for (let i = 0; i < dice; i++) {
        const r = this.rollDie();
        rolls.push(r);
        total += r;
      }
      if (p.charityTurns > 0) p.charityTurns -= 1;

      const board = p.phase === 'fast' ? FAST_BOARD : BOARD;
      const prev = p.position;
      p.position = (p.position + total) % board.length;
      p.turns += 1;

      // Collect on every Payday passed or landed on (Classic-style)
      if (p.phase === 'rat') {
        for (let step = 1; step <= total; step++) {
          const idx = (prev + step) % BOARD.length;
          if (BOARD[idx].type === 'payday') this.collectPayday(step < total);
        }
      }

      this.pushLog(`Rolled ${rolls.join('+')} = ${total}. Landed on ${board[p.position].label}.`);
      this.save();
      this.resolveSpace();
    }

    collectPayday(passing) {
      const p = this.state.player;
      if (p.skippedPayday) {
        p.skippedPayday = false;
        this.pushLog('Downsized: you skip this payday.');
        return;
      }
      const cf = monthlyCashflow(p);
      p.cash += cf;
      this.pushLog(`${passing ? 'Passed' : 'Landed on'} PAYDAY: ${cf >= 0 ? '+' : ''}${$(cf)}. Cash ${$(p.cash)}.`);
      if (p.cash < 0) this.forceBorrow();
    }

    forceBorrow() {
      const p = this.state.player;
      const need = Math.ceil(Math.abs(Math.min(0, p.cash)) / 1000) * 1000;
      if (need <= 0) return;
      p.liabilities.bankLoan = (p.liabilities.bankLoan || 0) + need;
      p.cash += need;
      this.pushLog(`Bank loan ${$(need)} taken (10%/mo).`);
    }

    takeLoan(amount) {
      const p = this.state.player;
      const a = Math.ceil(amount / 1000) * 1000;
      if (a <= 0) return;
      p.liabilities.bankLoan = (p.liabilities.bankLoan || 0) + a;
      p.cash += a;
      this.pushLog(`Borrowed ${$(a)}.`);
      this.save();
      this.render();
    }

    repayLoan(amount) {
      const p = this.state.player;
      const a = Math.min(p.liabilities.bankLoan || 0, Math.floor(amount / 1000) * 1000);
      if (a <= 0 || p.cash < a) {
        this.pushLog('Cannot repay that amount.');
        this.render();
        return;
      }
      p.liabilities.bankLoan -= a;
      p.cash -= a;
      this.pushLog(`Repaid ${$(a)} bank loan.`);
      this.save();
      this.render();
    }

    resolveSpace() {
      const p = this.state.player;
      const board = p.phase === 'fast' ? FAST_BOARD : BOARD;
      const space = board[p.position];

      if (p.phase === 'fast') {
        this.resolveFast(space);
        return;
      }

      switch (space.type) {
        case 'payday':
          this.checkEscape();
          if (!this.modal) this.beginTurn();
          break;
        case 'opportunity':
          this.openOpportunity();
          break;
        case 'market':
          this.openMarket();
          break;
        case 'doodad':
          this.openDoodad();
          break;
        case 'charity':
          this.openCharity();
          break;
        case 'baby':
          this.openBaby();
          break;
        case 'downsized':
          this.openDownsized();
          break;
        default:
          this.beginTurn();
      }
    }

    checkEscape() {
      const p = this.state.player;
      if (p.phase !== 'rat') return;
      if (!hasEscaped(p)) return;
      this.openModal({
        title: 'Out of the Rat Race!',
        body: `<p>Passive income ${$(passiveIncome(p))} exceeds expenses ${$(totalExpenses(p))}.</p>
               <p>Enter the Fast Track and chase your dream — or keep playing the Rat Race.</p>`,
        actions: [
          { label: 'Enter Fast Track', primary: true, fn: () => this.enterFastTrack() },
          { label: 'Stay in Rat Race', fn: () => { this.closeModal(); this.beginTurn(); } }
        ]
      });
    }

    enterFastTrack() {
      const p = this.state.player;
      p.phase = 'fast';
      p.position = 0;
      this.closeModal();
      this.openModal({
        title: 'Choose Your Dream',
        body: `<div class="cl-dreams">${DREAMS.map(d => `
          <button type="button" class="cl-dream" data-dream="${d.id}">
            <strong>${d.title}</strong>
            <span>${$(d.cost)}</span>
            <em>${d.desc}</em>
          </button>`).join('')}</div>`,
        actions: []
      });
      setTimeout(() => {
        this.host.querySelectorAll('[data-dream]').forEach(btn => {
          btn.onclick = () => {
            p.dreamId = btn.dataset.dream;
            this.pushLog(`Dream selected: ${DREAMS.find(d => d.id === p.dreamId).title}`);
            this.closeModal();
            this.save();
            this.beginTurn();
          };
        });
      }, 0);
    }

    openOpportunity() {
      this.openModal({
        title: 'Opportunity',
        body: '<p>Choose a Small Deal or Big Deal.</p>',
        actions: [
          { label: 'Small Deal', primary: true, fn: () => this.showDeal(drawFrom(this.state.decks, 'small'), 'small') },
          { label: 'Big Deal', primary: true, fn: () => this.showDeal(drawFrom(this.state.decks, 'big'), 'big') }
        ]
      });
    }

    showDeal(deal, deck) {
      if (!deal) { this.closeModal(); this.beginTurn(); return; }
      const p = this.state.player;
      const price = deal.down != null ? deal.down : deal.cost;
      const canBuy = p.cash >= price;
      this.openModal({
        title: deal.title,
        body: `<p>${deal.desc || ''}</p>
          <div class="cl-deal-stats">
            <div><span>Cost / Down</span><strong>${$(price)}</strong></div>
            <div><span>Cashflow</span><strong class="${(deal.cashflow || 0) >= 0 ? 'pos' : 'neg'}">${$(deal.cashflow || 0)}/mo</strong></div>
            ${deal.mortgage ? `<div><span>Mortgage</span><strong>${$(deal.mortgage)}</strong></div>` : ''}
            <div><span>Your cash</span><strong>${$(p.cash)}</strong></div>
          </div>`,
        actions: [
          {
            label: canBuy ? 'Buy' : 'Borrow & Buy',
            primary: true,
            fn: () => this.buyDeal(deal, price)
          },
          { label: 'Pass', fn: () => { this.closeModal(); this.afterAction(); } }
        ]
      });
    }

    buyDeal(deal, price) {
      const p = this.state.player;
      if (p.cash < price) {
        const need = Math.ceil((price - p.cash) / 1000) * 1000;
        p.liabilities.bankLoan = (p.liabilities.bankLoan || 0) + need;
        p.cash += need;
        this.pushLog(`Borrowed ${$(need)} to buy.`);
      }
      p.cash -= price;
      const asset = {
        id: UtilsSafeId(),
        kind: deal.kind,
        title: deal.title,
        cost: deal.cost || price,
        down: deal.down || price,
        mortgage: deal.mortgage || 0,
        cashflow: deal.cashflow || 0,
        shares: deal.shares,
        price: deal.price,
        symbol: deal.symbol
      };
      p.assets.push(asset);
      this.pushLog(`Bought ${deal.title} for ${$(price)}. CF ${$(deal.cashflow || 0)}/mo.`);
      this.closeModal();
      this.afterAction();
    }

    openDoodad() {
      const card = drawFrom(this.state.decks, 'doodad');
      const p = this.state.player;
      this.openModal({
        title: 'Doodad!',
        body: `<p><strong>${card.title}</strong></p><p>${card.desc}</p>`,
        actions: [{
          label: `Pay ${$(card.cost)}`,
          primary: true,
          fn: () => {
            if (p.cash < card.cost) this.forceBorrow();
            while (p.cash < card.cost) this.forceBorrow();
            p.cash -= card.cost;
            this.pushLog(`Doodad: ${card.title} −${$(card.cost)}.`);
            this.closeModal();
            this.afterAction();
          }
        }]
      });
    }

    openCharity() {
      const p = this.state.player;
      const gift = Math.round(totalIncome(p) * 0.1);
      this.openModal({
        title: 'Charity',
        body: `<p>Donate 10% of total income (${$(gift)}) to use 1 or 2 dice for the next 3 turns.</p>`,
        actions: [
          {
            label: `Donate ${$(gift)}`,
            primary: true,
            fn: () => {
              if (p.cash < gift) this.forceBorrow();
              while (p.cash < gift) this.forceBorrow();
              p.cash -= gift;
              p.charityTurns = 3;
              this.pushLog(`Charity donated ${$(gift)}. 2-dice option for 3 turns.`);
              this.closeModal();
              this.afterAction();
            }
          },
          { label: 'Skip', fn: () => { this.closeModal(); this.afterAction(); } }
        ]
      });
    }

    openBaby() {
      const p = this.state.player;
      if (p.children >= 3) {
        this.openModal({
          title: 'Baby',
          body: '<p>You already have 3 children (max). No extra expense.</p>',
          actions: [{ label: 'OK', primary: true, fn: () => { this.closeModal(); this.afterAction(); } }]
        });
        return;
      }
      p.children += 1;
      this.openModal({
        title: 'Baby!',
        body: `<p>Congratulations. Children: ${p.children}. Extra expense ${$(p.childCost)}/mo each.</p>`,
        actions: [{ label: 'OK', primary: true, fn: () => { this.closeModal(); this.afterAction(); } }]
      });
      this.pushLog(`Baby! Children = ${p.children}.`);
    }

    openDownsized() {
      const p = this.state.player;
      p.skippedPayday = true;
      p.position = 0;
      this.openModal({
        title: 'Downsized!',
        body: '<p>You lost your job. Return to start and skip your next Payday. Expenses still continue.</p>',
        actions: [{ label: 'OK', primary: true, fn: () => { this.closeModal(); this.afterAction(); } }]
      });
      this.pushLog('Downsized — skip next payday.');
    }

    openMarket() {
      const card = drawFrom(this.state.decks, 'market');
      const p = this.state.player;
      const sellable = p.assets.filter(a => this.marketMatches(a, card));
      let body = `<p><strong>${card.title}</strong></p><p>${card.desc}</p>`;
      if (!sellable.length) {
        body += '<p class="cl-muted">You have no matching assets to sell.</p>';
        this.openModal({
          title: 'Market',
          body,
          actions: [{ label: 'Continue', primary: true, fn: () => { this.closeModal(); this.afterAction(); } }]
        });
        return;
      }
      body += `<div class="cl-sell-list">${sellable.map(a => {
        const sale = this.salePrice(a, card);
        return `<button type="button" class="cl-sell-btn" data-aid="${a.id}">Sell ${a.title} for ${$(sale)}</button>`;
      }).join('')}</div>`;
      this.openModal({
        title: 'Market',
        body,
        actions: [{ label: 'Done', primary: true, fn: () => { this.closeModal(); this.afterAction(); } }]
      });
      setTimeout(() => {
        this.host.querySelectorAll('.cl-sell-btn').forEach(btn => {
          btn.onclick = () => {
            const asset = p.assets.find(a => a.id === btn.dataset.aid);
            if (!asset) return;
            const sale = this.salePrice(asset, card);
            p.cash += sale;
            if (asset.mortgage) {
              // mortgage paid off from sale proceeds conceptually already netted in sale? 
              // Classic: sale price is what buyer pays; you clear mortgage from proceeds.
              // We treat sale as equity cash = salePrice where salePrice is net to player for simplicity,
              // OR gross - mortgage. Use net equity style: sale = bonus adjusted cost - remaining mortgage approx.
            }
            p.assets = p.assets.filter(a => a.id !== asset.id);
            this.pushLog(`Sold ${asset.title} for ${$(sale)}.`);
            this.save();
            this.openMarket(); // refresh list with same card? better close and continue
            // Re-open market with same card depleted - simpler: just continue
            this.closeModal();
            this.afterAction();
          };
        });
      }, 0);
    }

    marketMatches(asset, card) {
      if (card.match === 'stock' && asset.kind === 'stock') {
        if (!card.symbol) return true;
        return (asset.symbol || '').toUpperCase().includes(card.symbol.toUpperCase());
      }
      if (card.match === 're' && asset.kind === 're') {
        if (card.titleFilter) return asset.title.includes(card.titleFilter);
        return true;
      }
      if (card.match === 'biz' && asset.kind === 'biz') return true;
      return false;
    }

    salePrice(asset, card) {
      if (asset.kind === 'stock') {
        const px = card.price != null ? card.price : (asset.price || 10);
        return px * (asset.shares || 0);
      }
      const basis = asset.cost || asset.down || 0;
      const bonus = card.priceBonus || 0;
      const gross = Math.max(0, basis + bonus);
      const mortgage = asset.mortgage || 0;
      return Math.max(0, gross - mortgage + (asset.down || 0)); // rough equity out
    }

    resolveFast(space) {
      const p = this.state.player;
      const dream = DREAMS.find(d => d.id === p.dreamId);
      if (space.type === 'ft_cash') {
        const cf = monthlyCashflow(p);
        p.cash += cf;
        this.pushLog(`Fast Track cash day: ${$(cf)}.`);
        this.tryBuyDream();
        return;
      }
      if (space.type === 'ft_deal') {
        this.showDeal(drawFrom(this.state.decks, 'fast'), 'fast');
        return;
      }
      if (space.type === 'ft_charity') {
        this.openCharity();
        return;
      }
      if (space.type === 'ft_tax' || space.type === 'ft_divorce' || space.type === 'ft_lawsuit') {
        const hit = Math.round(Math.max(0, p.cash) * (space.amount || 0.5));
        p.cash -= hit;
        if (p.cash < 0) this.forceBorrow();
        this.pushLog(`${space.label}: −${$(hit)}.`);
        this.openModal({
          title: space.label,
          body: `<p>You pay ${$(hit)}.</p>`,
          actions: [{ label: 'OK', primary: true, fn: () => { this.closeModal(); this.afterAction(); } }]
        });
        return;
      }
      this.afterAction();
    }

    tryBuyDream() {
      const p = this.state.player;
      const dream = DREAMS.find(d => d.id === p.dreamId);
      if (!dream || p.dreamPaid) {
        this.afterAction();
        return;
      }
      if (p.cash >= dream.cost) {
        this.openModal({
          title: 'Buy Your Dream?',
          body: `<p>${dream.title} costs ${$(dream.cost)}. You have ${$(p.cash)}.</p>`,
          actions: [
            {
              label: `Buy for ${$(dream.cost)}`,
              primary: true,
              fn: () => {
                p.cash -= dream.cost;
                p.dreamPaid = true;
                this.pushLog(`Dream purchased: ${dream.title}!`);
                this.closeModal();
                this.openModal({
                  title: 'Victory!',
                  body: `<p>You escaped the rat race and claimed <strong>${dream.title}</strong>.</p>`,
                  actions: [
                    { label: 'New Game', primary: true, fn: () => this.startNew() },
                    { label: 'Keep Playing', fn: () => { this.closeModal(); this.beginTurn(); } }
                  ]
                });
                this.save();
              }
            },
            { label: 'Not yet', fn: () => { this.closeModal(); this.afterAction(); } }
          ]
        });
      } else {
        this.afterAction();
      }
    }

    afterAction() {
      this.save();
      if (this.state.player.phase === 'rat') this.checkEscape();
      if (this.modal) {
        this.render();
        return;
      }
      this.beginTurn();
    }

    openModal({ title, body, actions }) {
      this.modal = { title, body, actions };
      this.render();
    }

    closeModal() {
      this.modal = null;
    }

    renderMenu() {
      this.host.innerHTML = `
        <div class="cl-shell">
          <div class="cl-hero">
            <button type="button" class="cl-back" data-cl="exit"><i class="fas fa-chevron-left"></i></button>
            <div class="cl-hero-copy">
              <p class="cl-kicker">VaultOne · Solo</p>
              <h1>Cash Lab</h1>
              <p>Classic cashflow rules, rebuilt as an original training game. Escape the rat race by building passive income above expenses — then chase your dream on the Fast Track.</p>
              <div class="cl-hero-actions">
                <button type="button" class="btn btn-primary" data-cl="new">New Game</button>
                ${(() => { try { return localStorage.getItem(STORAGE_KEY) ? '<button type="button" class="btn btn-secondary" data-cl="continue">Continue</button>' : ''; } catch (_) { return ''; } })()}
              </div>
              <p class="cl-legal">Educational simulation. Not affiliated with Rich Dad or CASHFLOW®.</p>
            </div>
          </div>
        </div>`;
      this.bindShell();
    }

    render() {
      if (!this.state) { this.renderMenu(); return; }
      if (this.state.screen === 'profession') {
        this.host.innerHTML = `
          <div class="cl-shell">
            <div class="cl-top">
              <button type="button" class="cl-back" data-cl="exit"><i class="fas fa-chevron-left"></i></button>
              <h2>Choose Profession</h2>
            </div>
            <div class="cl-prof-grid">
              ${PROFESSIONS.map(p => `
                <button type="button" class="cl-prof" data-prof="${p.id}">
                  <strong>${p.title}</strong>
                  <span>Salary ${$(p.salary)}</span>
                  <span>Savings ${$(p.savings)}</span>
                </button>`).join('')}
            </div>
          </div>`;
        this.bindShell();
        this.host.querySelectorAll('[data-prof]').forEach(btn => {
          btn.onclick = () => this.pickProfession(btn.dataset.prof);
        });
        return;
      }

      const p = this.state.player;
      const board = p.phase === 'fast' ? FAST_BOARD : BOARD;
      const pi = passiveIncome(p);
      const exp = totalExpenses(p);
      const cf = monthlyCashflow(p);
      const escaped = hasEscaped(p);
      const dream = DREAMS.find(d => d.id === p.dreamId);

      this.host.innerHTML = `
        <div class="cl-shell cl-play">
          <div class="cl-top">
            <button type="button" class="cl-back" data-cl="exit"><i class="fas fa-chevron-left"></i></button>
            <div class="cl-top-meta">
              <h2>Cash Lab</h2>
              <span>${p.title} · ${p.phase === 'fast' ? 'Fast Track' : 'Rat Race'}${dream ? ' · ' + dream.title : ''}</span>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" data-cl="new">Restart</button>
          </div>

          <div class="cl-stats">
            <div class="cl-stat"><span>Cash</span><strong>${$(p.cash)}</strong></div>
            <div class="cl-stat"><span>Income</span><strong>${$(totalIncome(p))}</strong></div>
            <div class="cl-stat"><span>Expenses</span><strong>${$(exp)}</strong></div>
            <div class="cl-stat"><span>Passive</span><strong class="${pi > exp ? 'pos' : ''}">${$(pi)}</strong></div>
            <div class="cl-stat"><span>Cashflow</span><strong class="${cf >= 0 ? 'pos' : 'neg'}">${$(cf)}</strong></div>
            <div class="cl-stat"><span>Goal</span><strong>${escaped ? 'ESCAPED' : 'Passive > Expenses'}</strong></div>
          </div>

          <div class="cl-board" aria-label="Game board">
            ${board.map((s, i) => `
              <div class="cl-space cl-${s.type}${i === p.position ? ' is-here' : ''}" title="${s.label}">
                <span class="cl-space-i">${i + 1}</span>
                <span class="cl-space-l">${s.label}</span>
              </div>`).join('')}
          </div>

          <div class="cl-actions">
            ${this.state.awaitingRoll ? `
              <button type="button" class="btn btn-primary cl-roll" data-cl="roll">
                <i class="fas fa-dice"></i> Roll Dice
              </button>` : `<button type="button" class="btn btn-primary" disabled>Resolving…</button>`}
            <button type="button" class="btn btn-secondary" data-cl="loan">Borrow $1,000</button>
            <button type="button" class="btn btn-secondary" data-cl="repay">Repay $1,000</button>
            <button type="button" class="btn btn-secondary" data-cl="sheet">Statement</button>
          </div>

          <div class="cl-cols">
            <div class="cl-panel">
              <h3>Assets (${p.assets.length})</h3>
              <ul class="cl-list">
                ${p.assets.length ? p.assets.map(a => `<li><strong>${a.title}</strong><span>${$(a.cashflow)}/mo</span></li>`).join('') : '<li class="cl-muted">No assets yet</li>'}
              </ul>
            </div>
            <div class="cl-panel">
              <h3>Log</h3>
              <ul class="cl-log">${this.log.map(l => `<li>${l.msg}</li>`).join('') || '<li class="cl-muted">Roll to begin</li>'}</ul>
            </div>
          </div>

          ${this.modal ? `
            <div class="cl-modal-backdrop">
              <div class="cl-modal">
                <h3>${this.modal.title}</h3>
                <div class="cl-modal-body">${this.modal.body}</div>
                <div class="cl-modal-actions">
                  ${(this.modal.actions || []).map((a, i) => `
                    <button type="button" class="btn ${a.primary ? 'btn-primary' : 'btn-secondary'}" data-ma="${i}">${a.label}</button>
                  `).join('')}
                </div>
              </div>
            </div>` : ''}
        </div>`;

      this.bindShell();
      if (this.state.awaitingRoll) {
        const rollBtn = this.host.querySelector('[data-cl="roll"]');
        if (rollBtn) rollBtn.onclick = () => this.doRoll();
      }
      this.host.querySelector('[data-cl="loan"]')?.addEventListener('click', () => this.takeLoan(1000));
      this.host.querySelector('[data-cl="repay"]')?.addEventListener('click', () => this.repayLoan(1000));
      this.host.querySelector('[data-cl="sheet"]')?.addEventListener('click', () => this.showStatement());
      if (this.modal) {
        (this.modal.actions || []).forEach((a, i) => {
          const btn = this.host.querySelector(`[data-ma="${i}"]`);
          if (btn) btn.onclick = () => a.fn();
        });
      }
    }

    showStatement() {
      const p = this.state.player;
      this.openModal({
        title: 'Income Statement',
        body: `
          <div class="cl-sheet">
            <h4>Income</h4>
            <div class="cl-row"><span>Salary</span><span>${$(p.salary)}</span></div>
            <div class="cl-row"><span>Passive / Investments</span><span>${$(passiveIncome(p))}</span></div>
            <div class="cl-row total"><span>Total Income</span><span>${$(totalIncome(p))}</span></div>
            <h4>Expenses</h4>
            <div class="cl-row"><span>Taxes</span><span>${$(p.taxes)}</span></div>
            <div class="cl-row"><span>Home Mortgage</span><span>${$(p.mortgagePay)}</span></div>
            <div class="cl-row"><span>School Loan</span><span>${$(p.schoolPay)}</span></div>
            <div class="cl-row"><span>Car Loan</span><span>${$(p.carPay)}</span></div>
            <div class="cl-row"><span>Credit Cards</span><span>${$(p.creditPay)}</span></div>
            <div class="cl-row"><span>Retail Debt</span><span>${$(p.retailPay)}</span></div>
            <div class="cl-row"><span>Other</span><span>${$(p.other)}</span></div>
            <div class="cl-row"><span>Children (${p.children}×${$(p.childCost)})</span><span>${$(p.children * p.childCost)}</span></div>
            <div class="cl-row"><span>Bank Loan Interest</span><span>${$(Math.ceil((p.liabilities.bankLoan || 0) * 0.1))}</span></div>
            <div class="cl-row total"><span>Total Expenses</span><span>${$(totalExpenses(p))}</span></div>
            <div class="cl-row total"><span>Monthly Cashflow</span><span>${$(monthlyCashflow(p))}</span></div>
            <h4>Balance Sheet</h4>
            <div class="cl-row"><span>Cash</span><span>${$(p.cash)}</span></div>
            <div class="cl-row"><span>Bank Loan</span><span>${$(p.liabilities.bankLoan || 0)}</span></div>
          </div>`,
        actions: [{ label: 'Close', primary: true, fn: () => { this.closeModal(); this.render(); } }]
      });
    }

    bindShell() {
      this.host.querySelector('[data-cl="exit"]')?.addEventListener('click', () => this.onExit());
      this.host.querySelector('[data-cl="new"]')?.addEventListener('click', () => {
        if (this.state?.player && !confirm('Start a new Cash Lab game? Progress will be lost.')) return;
        this.startNew();
      });
      this.host.querySelector('[data-cl="continue"]')?.addEventListener('click', () => {
        try {
          this.state = JSON.parse(localStorage.getItem(STORAGE_KEY));
          this.state.awaitingRoll = true;
          this.render();
        } catch (_) { this.renderMenu(); }
      });
    }

    destroy() {
      this.save();
      this.host.innerHTML = '';
    }
  }

  function UtilsSafeId() {
    return 'a' + Math.random().toString(36).slice(2, 10);
  }

  global.CashLabGame = CashLabGame;
})(window);
