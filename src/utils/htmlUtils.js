export const createElement = (tag, attributes, eventHandlers) => {
    const attr = attributes && attributes;
    const element = Object.assign(document.createElement(tag), { ...attr });
  
    if(eventHandlers) {
      const {onSubmit, onClick} = eventHandlers;
      if(onSubmit) {
        element.addEventListener('submit', onSubmit);
      }
    
      if(onClick) {
        element.addEventListener('click', onClick);
      }
    }
  
    return element;
  };
  