import { Injectable } from '@angular/core';
import {Recipe} from "./recipe.model";

@Injectable({
    providedIn: 'root'
})

export class RecipesService {

    private recipes: Recipe[] = [
        {
            id:  'r1',
            title: 'Gado-gado',
            imageUrl: 'https://cdn0-production-images-kly.akamaized.net/Kkah0HEN_qXueWP0ERTTDKrhYe8=/680x383/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2413676/original/011486100_1542811444-Gado_gado.jpg',
            ingredients: ['Lontong', 'Sawi', 'Bumbu Kecap', 'Tauge']
        },
        {
            id:  'r2',
            title: 'Ketupat',
            imageUrl: 'https://previews.123rf.com/images/lim_atos/lim_atos1407/lim_atos140700098/30211209-ketupat.jpg',
            ingredients: ['Nasi', 'Daun Pisang']
        },
        {
            id:  'r3',
            title: 'Pizza Margerita',
            imageUrl: 'https://img.taste.com.au/Wf8mL7LT/w720-h480-cfill-q80/taste/2016/11/jessica-39581-2.jpeg',
            ingredients: ['Tepung', 'Tomat', 'Bumbu Kecap', 'Tauge']
        },
    ];

    constructor() { }

    getAllRecipes() {
        return [...this.recipes];
    }

    getRecipe(recipeId: string) {
        return {
            ...this.recipes.find(recipe => {
                return recipe.id === recipeId;
            })
        };
    }
}
