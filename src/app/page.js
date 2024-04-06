'use client'
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [itemExists, setItemExists] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    const checkItemExists = async () => {
      if (selectedItem !== '') {
        const q = query(collection(db, 'gifts'), where('itemName', '==', selectedItem));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setItemExists(true);
        } else {
          setItemExists(false);
        }
      }
    };

    checkItemExists();
  }, [selectedItem]);

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
    setSubmitted(false);
    setItemExists(false); // Reset itemExists state when selecting a new item
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== '' && selectedItem !== '') {
      try {
        const docRef = await addDoc(collection(db, 'gifts'), {
          itemName: selectedItem,
          recipientName: name.trim(),
        });
        console.log('Document written with ID: ', docRef.id);
        setMessage('Enviado com sucesso');
        setName('');
        setSelectedItem('');
        setSubmitted(true);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      setSubmitted(false); // Adicione esta linha para garantir que o estado submitted seja falso quando os campos estiverem vazios
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 bg-gray-100'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-serif text-base'>
        <div className='flex justify-center items-center'>
          <img src="/brasao.png" alt='Presente' className='mb-4' style={{ width: '200px' }} />
        </div>
        <h1 className='text-4xl p-4 text-center' style={{ color: '#333333' }}>Lista de Presentes</h1>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <form className='flex flex-col items-center text-black'>

            <select
              value={selectedItem}
              onChange={handleSelectChange}
              className='col-span-3 p-3 border'
              style={{ width: '300px', borderRadius: '5px' }}
            >
              <option value=''>Selecione um item</option>
              <option value='Jogo De Talheres'>Jogo De Talheres</option>
              <option value='Jarra De suco'>Jarra De suco</option>
              <option value='Faqueiro'>Faqueiro</option>
              <option value='Jogo De Bowl'>Jogo De Bowl</option>
              <option value='Jogo De Pratos'>Jogo De Pratos</option>
              <option value='Cestos Organizadores'>Cestos Organizadores</option>
              <option value='Jogo de Copos'>Jogo de Copos</option>
              <option value='Aparelho De Jantar'>Aparelho De Jantar</option>
              <option value='Utensílios De Silicone'>Utensílios De Silicone</option>
              <option value='Aparelho De Sobremesa'>Aparelho De Sobremesa</option>
              <option value='Panela de pressão'>Panela de pressão</option>
              <option value='Panela de arroz'>Panela de arroz</option>
              <option value='Porta Temperos'>Porta Temperos</option>
              <option value='Liquidificador'>Liquidificador</option>
              <option value='Purificador de água'>Purificador de água</option>
              <option value='Air fryer - Josy e Hugo'>Air fryer - Josy e Hugo</option>
              <option value='Sanduicheira'>Sanduicheira</option>
              <option value='Tábua De Corte'>Tábua De Corte</option>
              <option value='Jogo De Taças'>Jogo De Taças</option>
              <option value='Porta Frios'>Porta Frios</option>
              <option value='Jogo De Panelas'>Jogo De Panelas</option>
              <option value='frigideira'>frigideira</option>
              <option value='Potes Porta Mantimentos'>Potes Porta Mantimentos</option>
              <option value='Escorredor De Louça'>Escorredor De Louça</option>
              <option value='chaleira elétrica'>chaleira elétrica</option>
              <option value='Ralador'>Ralador</option>
              <option value='Formas/Assadeiras'>Formas/Assadeiras</option>
              <option value='Travessa De Vidro'>Travessa De Vidro</option>
              <option value='Potes De Uso Diário'>Potes De Uso Diário</option>
              <option value='Jogo De Travessas'>Jogo De Travessas</option>
              <option value='Jogo de travesseiros'>Jogo de travesseiros</option>
              <option value='Ferro de passar'>Ferro de passar</option>
              <option value='Jogo de cama Queen'>Jogo de cama Queen</option>
              <option value='Lençol de cama Queen'>Lençol de cama Queen</option>
              <option value='Edredom'>Edredom</option>
              <option value='Jogo de toalhas de banho'>Jogo de toalhas de banho</option>
              <option value='Kit banheiro'>Kit banheiro</option>
              <option value='Asspirador de pó'>Asspirador de pó</option>
              </select>
            {selectedItem && (
              <div className='col-span-3'>
                {itemExists && <p className='text-red-500'>Este item já foi escolhido.</p>}
                {!itemExists && (
                  <>
                    <input
                      value={name}
                      onChange={handleNameChange}
                      className='p-3 border'
                      type='text'
                      placeholder='Digite seu nome completo'
                      style={{ width: '300px', borderRadius: '5px', display: 'flex', flexDirection: 'column', marginTop: '20px' }}
                    />
                    <button
                      onClick={handleSubmit}
                      className='text-black py-2 text-xl mt-4 rounded-md shadow-md border border-black mt-5 hover:bg-black hover:text-white self-center text-center'
                      type='submit'
                      style={{ width: '300px' }}
                    >
                      Enviar
                    </button>
                    {submitted && <p className='text-green-500'>Envio bem-sucedido!</p>}
                    {message && <p className='text-green-500'>{message}</p>}

                  </>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}