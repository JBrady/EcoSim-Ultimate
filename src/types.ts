export type Baseline = {
  rate: number;
  qt: number;
  spending: number;
  corpTax: number;
  incTax: number;
  tariffs: number;
  oil: number;
  mig: number;
  healthSub: number;
  drugCaps: number;
  gdp: number;
  inf: number;
  unemp: number;
  yield10: number;
  uninsured: number;
  deficit: number;
  healthInf: number;
  debt: number;
  timestamp?: string;
};

export type Inputs = Omit<
  Baseline,
  | 'gdp'
  | 'inf'
  | 'unemp'
  | 'yield10'
  | 'uninsured'
  | 'deficit'
  | 'healthInf'
  | 'debt'
  | 'timestamp'
>;

export type Outputs = {
  gdp: number;
  inf: number;
  unemp: number;
  uninsured: number;
  deficit: number;
  debt: number;
  yield10: number;
};

export type Coefficients = {
  yield10: { rate: number; qt: number; spending: number; oil: number };
  gdp: {
    spending: number;
    rate: number;
    qt: number;
    tariffs: number;
    corpTax: number;
    incTax: number;
    oil: number;
    mig: number;
    drugCaps: number;
  };
  inf: {
    spending: number;
    rate: number;
    qt: number;
    tariffs: number;
    mig: number;
    oil: number;
    incTax: number;
    drugCaps: number;
    healthSub: number;
  };
  unempGap: number;
  unins: { healthSub: number; unemp: number };
  deficit: {
    spending: number;
    healthSub: number;
    tariffs: number;
    corpTax: number;
    incTax: number;
    rate: number;
  };
};

