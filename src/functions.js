export default (val) => 
    typeof val === 'object' && val !== null && !Array.isArray(val)