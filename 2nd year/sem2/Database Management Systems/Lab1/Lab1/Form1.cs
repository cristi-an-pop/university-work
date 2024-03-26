using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace Lab1
{
    public partial class Form1 : Form
    {
        SqlConnection connection = new SqlConnection("Data Source=DESKTOP-9JN9AMI\\SQLEXPRESS;Initial Catalog=MountainBikesStore;Integrated Security=True;TrustServerCertificate=True");
        SqlDataAdapter parentAdapter, childAdapter;
        DataSet dataSet;

        public Form1()
        {
            InitializeComponent();
        }

        private void dataGridViewBrands_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            var name = dataGridViewBrands.Rows[e.RowIndex].Cells[0].Value;

            string sqlCommand = "select * from Bikes where brand=@brand_name";
            SqlCommand getBikesByBrand = new SqlCommand(sqlCommand, connection);
            getBikesByBrand.Parameters.AddWithValue("@brand_name", name);

            dataSet = new DataSet();
            childAdapter = new SqlDataAdapter(getBikesByBrand);
            childAdapter.Fill(dataSet, "Bikes");

            dataGridViewBikes.DataSource = dataSet.Tables["Bikes"];
        }

        private void updateButton_Click(object sender, EventArgs e)
        {
            SqlCommandBuilder commandBuilder = new SqlCommandBuilder(childAdapter);
            childAdapter.Update(dataSet, "Bikes");
        }

        private void deleteButton_Click(object sender, EventArgs e)
        {
            if (dataGridViewBikes.SelectedRows.Count > 0)
            {
                dataGridViewBikes.Rows.RemoveAt(dataGridViewBikes.SelectedRows[0].Index);
                SqlCommandBuilder commandBuilder = new SqlCommandBuilder(childAdapter);
                childAdapter.Update(dataSet, "Bikes");
            }
        }

        private void Add_Click(object sender, EventArgs e)
        {
            DataRow newRow = dataSet.Tables["Bikes"].NewRow();
            newRow["brand"] = dataGridViewBrands.CurrentRow.Cells["brand_name"].Value; // Assuming "brand" is the column name in child table
            dataSet.Tables["Bikes"].Rows.Add(newRow);
            SqlCommandBuilder commandBuilder = new SqlCommandBuilder(childAdapter);
            childAdapter.Update(dataSet, "Bikes");
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            parentAdapter = new SqlDataAdapter("select * from Brands", connection);
            dataSet = new DataSet();
            parentAdapter.Fill(dataSet, "Brands");

            dataGridViewBrands.DataSource = dataSet.Tables["Brands"];
        }
    }
}
