import React from 'react';

const carBrands = ['ВАЗ', 'Kia', 'Skoda', 'Renault'];
const carModels = {
  'ВАЗ': ['2101','2105','2109','2110','Приора','Гранта'],
  'Kia': ['Ceed', 'Rio', 'Sportage', 'Optima', 'Sorento'],
  'Skoda': ['Fabia', 'Octavia', 'Rapid', 'Yeti', 'Superb'],
  'Renault': ['Duster', 'Fluece', 'Laguna', 'Logan', 'Megan', 'Sandero']
};

const CarAvailability = (props) => {
  const { id, actions, stateToProps } = props
  const { changeValue } = actions;
  const { carAvailability, carBrand, carModel } = stateToProps;
  return (
    <div>
      <label>
        Наличие машины:&nbsp;
        <input type='checkbox' onChange={(e) => changeValue(id, e.target.checked)} />
      </label>
      {carAvailability.value &&
        <div>
          <label>
            Марка автомобиля:&nbsp;
            <select onChange={(e) => changeValue('carBrand', e.target.value)} value={carBrand.value || 'default'}>
              <option disabled value='default'>Выберете марку автомобиля</option>
              {carBrands.map((item, index) => {
                return <option key={Date.now() + index} value={item}>{item}</option>
              })}
            </select>
          </label>
          <label>
            Модель автомобиля:&nbsp;
            <select onChange={(e) => changeValue('carModel', e.target.value)} value={carModel.value || 'default'}>
              <option disabled value='default'>Выберете модель автомобиля</option>
              {carBrand.value && carModels[carBrand.value].map((item, index) => {
                return <option key={Date.now() + index} value={item}>{item}</option>
              })}
            </select>
          </label>
        </div>
      }
    </div>
  )
}

export default CarAvailability;
