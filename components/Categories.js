import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoriesCard from './CategoriesCard'
import sanityClient from '../sanity';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == 'category']
    `).then(data => {
      setCategories(data)
    })
  }, [])
  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: 5
      }}
    >
      {/* CategoriesCard */}
      {categories?.map(category => (
        <CategoriesCard
          key={category._id}
          id={category._id} 
          imgUrl={category.image} 
          title={category.name}
        />
      ))}
      
      
    </ScrollView>
  )
}

export default Categories