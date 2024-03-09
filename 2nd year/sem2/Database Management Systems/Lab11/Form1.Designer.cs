namespace Lab11
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.mountainBikesStoreDataSet1 = new Lab11.MountainBikesStoreDataSet();
            this.mountainBikesStoreDataSet1BindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.dataGridView2 = new System.Windows.Forms.DataGridView();
            this.bikesBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.bikesTableAdapter = new Lab11.MountainBikesStoreDataSetTableAdapters.BikesTableAdapter();
            this.bikeidDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.brandDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.modelnameDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.bikedescriptionDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.priceDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.stockquantityDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)(this.mountainBikesStoreDataSet1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.mountainBikesStoreDataSet1BindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.bikesBindingSource)).BeginInit();
            this.SuspendLayout();
            // 
            // mountainBikesStoreDataSet1
            // 
            this.mountainBikesStoreDataSet1.DataSetName = "MountainBikesStoreDataSet";
            this.mountainBikesStoreDataSet1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // mountainBikesStoreDataSet1BindingSource
            // 
            this.mountainBikesStoreDataSet1BindingSource.DataSource = this.mountainBikesStoreDataSet1;
            this.mountainBikesStoreDataSet1BindingSource.Position = 0;
            // 
            // dataGridView2
            // 
            this.dataGridView2.AutoGenerateColumns = false;
            this.dataGridView2.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView2.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.bikeidDataGridViewTextBoxColumn,
            this.brandDataGridViewTextBoxColumn,
            this.modelnameDataGridViewTextBoxColumn,
            this.bikedescriptionDataGridViewTextBoxColumn,
            this.priceDataGridViewTextBoxColumn,
            this.stockquantityDataGridViewTextBoxColumn});
            this.dataGridView2.DataSource = this.bikesBindingSource;
            this.dataGridView2.Location = new System.Drawing.Point(101, 87);
            this.dataGridView2.Name = "dataGridView2";
            this.dataGridView2.Size = new System.Drawing.Size(577, 307);
            this.dataGridView2.TabIndex = 1;
            // 
            // bikesBindingSource
            // 
            this.bikesBindingSource.DataMember = "Bikes";
            this.bikesBindingSource.DataSource = this.mountainBikesStoreDataSet1;
            // 
            // bikesTableAdapter
            // 
            this.bikesTableAdapter.ClearBeforeFill = true;
            // 
            // bikeidDataGridViewTextBoxColumn
            // 
            this.bikeidDataGridViewTextBoxColumn.DataPropertyName = "bike_id";
            this.bikeidDataGridViewTextBoxColumn.HeaderText = "bike_id";
            this.bikeidDataGridViewTextBoxColumn.Name = "bikeidDataGridViewTextBoxColumn";
            // 
            // brandDataGridViewTextBoxColumn
            // 
            this.brandDataGridViewTextBoxColumn.DataPropertyName = "brand";
            this.brandDataGridViewTextBoxColumn.HeaderText = "brand";
            this.brandDataGridViewTextBoxColumn.Name = "brandDataGridViewTextBoxColumn";
            // 
            // modelnameDataGridViewTextBoxColumn
            // 
            this.modelnameDataGridViewTextBoxColumn.DataPropertyName = "model_name";
            this.modelnameDataGridViewTextBoxColumn.HeaderText = "model_name";
            this.modelnameDataGridViewTextBoxColumn.Name = "modelnameDataGridViewTextBoxColumn";
            // 
            // bikedescriptionDataGridViewTextBoxColumn
            // 
            this.bikedescriptionDataGridViewTextBoxColumn.DataPropertyName = "bike_description";
            this.bikedescriptionDataGridViewTextBoxColumn.HeaderText = "bike_description";
            this.bikedescriptionDataGridViewTextBoxColumn.Name = "bikedescriptionDataGridViewTextBoxColumn";
            // 
            // priceDataGridViewTextBoxColumn
            // 
            this.priceDataGridViewTextBoxColumn.DataPropertyName = "price";
            this.priceDataGridViewTextBoxColumn.HeaderText = "price";
            this.priceDataGridViewTextBoxColumn.Name = "priceDataGridViewTextBoxColumn";
            // 
            // stockquantityDataGridViewTextBoxColumn
            // 
            this.stockquantityDataGridViewTextBoxColumn.DataPropertyName = "stock_quantity";
            this.stockquantityDataGridViewTextBoxColumn.HeaderText = "stock_quantity";
            this.stockquantityDataGridViewTextBoxColumn.Name = "stockquantityDataGridViewTextBoxColumn";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.dataGridView2);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.mountainBikesStoreDataSet1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.mountainBikesStoreDataSet1BindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.bikesBindingSource)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private MountainBikesStoreDataSet mountainBikesStoreDataSet1;
        private System.Windows.Forms.BindingSource mountainBikesStoreDataSet1BindingSource;
        private System.Windows.Forms.DataGridView dataGridView2;
        private System.Windows.Forms.BindingSource bikesBindingSource;
        private MountainBikesStoreDataSetTableAdapters.BikesTableAdapter bikesTableAdapter;
        private System.Windows.Forms.DataGridViewTextBoxColumn bikeidDataGridViewTextBoxColumn;
        private System.Windows.Forms.DataGridViewTextBoxColumn brandDataGridViewTextBoxColumn;
        private System.Windows.Forms.DataGridViewTextBoxColumn modelnameDataGridViewTextBoxColumn;
        private System.Windows.Forms.DataGridViewTextBoxColumn bikedescriptionDataGridViewTextBoxColumn;
        private System.Windows.Forms.DataGridViewTextBoxColumn priceDataGridViewTextBoxColumn;
        private System.Windows.Forms.DataGridViewTextBoxColumn stockquantityDataGridViewTextBoxColumn;
    }
}

