console.log('Client side javascript')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const one=document.querySelector('#one')
const two=document.querySelector('#two')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    one.textContent='Loading...'
    two.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            one.textContent=data.error
        }
        else{
            one.textContent=data.location
            two.textContent=data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})