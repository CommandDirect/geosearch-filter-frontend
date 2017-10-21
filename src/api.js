const baseUrl = 'http://geosearch.commandprinting.com/api';

export const getCategoryData = async (provider) => {
  const response = await fetch(`${baseUrl}/${provider}/category`);
  const categories = await response.json();
  return categories.filter(s => s.category !== '');
};

export const getSpecialtyData = async (provider) => {
  const response = await fetch(`${baseUrl}/${provider}/specialty`);
  const specialties = await response.json();
  return specialties.filter(s => s.specialty !== '');
};

export const searchByName = (elementId, value) => {
  document.getElementById(elementId).value = value;
  document.getElementById('filter_form').submit();
};

export const searchByListValue = (dataField, elementId) => {
  const selected = dataField.options.filter(o => o.selected);
  const formData = selected.length > 0 ?
    selected.map(o => o.value).join('\',\'') :
    'none';

  document.getElementById(elementId).value = formData;
  document.getElementById('filter_form').submit();
};

export const searchByValue = (dataField, elementId) => {
  document.getElementById(elementId).value = dataField.value ? dataField.value : 'none';
  document.getElementById('filter_form').submit();
};