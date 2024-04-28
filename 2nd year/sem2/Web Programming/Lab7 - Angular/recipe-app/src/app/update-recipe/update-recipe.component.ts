import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css'],
})
export class UpdateRecipeComponent implements OnInit {
  recipeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    this.recipeForm = this.fb.group({
      id: id,
      author: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  onSubmit() {
    this.recipesService.updateRecipe(this.recipeForm.value).subscribe(
      (response) => {
        this.recipeForm.reset();
        console.log('Server response:', response);
        this.router.navigate(['/recipes']);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
