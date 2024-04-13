using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Lab2
{
    public partial class Form1 : Form
    {
        private SqlConnection connection;
        private SqlDataAdapter daParent, daChild;
        private DataSet tableData;
        private DataRelation drParentChild;
        private BindingSource bsParent, bsChild;

        public Form1()
        {
            InitializeComponent();
        }

        private string getConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString.ToString();
        }

        private string getDatabase()
        {
            return ConfigurationManager.AppSettings["Database"].ToString();
        }

        private string getParentTableName()
        {
            return ConfigurationManager.AppSettings["ParentTableName"].ToString();
        }

        private string getChildTableName()
        {
            return ConfigurationManager.AppSettings["ChildTableName"].ToString();
        }

        private string getParentSelectQuery()
        {
            return ConfigurationManager.AppSettings["ParentSelectQuery"].ToString();
        }

        private string getChildSelectQuery()
        {
            return ConfigurationManager.AppSettings["ChildSelectQuery"].ToString();
        }

        private string getParentReferencedKey()
        {
            return ConfigurationManager.AppSettings["ParentReferencedKey"].ToString();
        }

        private string getChildForeignKey()
        {
            return ConfigurationManager.AppSettings["ChildForeignKey"].ToString();
        }

        private string getParentSelectionQuery()
        {
            return ConfigurationManager.AppSettings["ParentSelectionQuery"].ToString();
        }

        private void parentTableView_SelectionChanged(object sender, EventArgs e)
        {
            if (parentTableView.SelectedRows.Count != 0)
            {
                DataGridViewRow selectedRow = parentTableView.SelectedRows[0];
                string selectCommandString = String.Format(getParentSelectionQuery(), selectedRow.Cells[0].Value);
                daChild.SelectCommand = new SqlCommand(selectCommandString, connection);
                ReloadChildTableView();
            }   
        }

        private void btnInsert_Click(object sender, EventArgs e)
        {

        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            SqlCommandBuilder builder = new SqlCommandBuilder(daChild);
            try
            {
                daChild.Update(tableData, getChildTableName());
            }
            catch (SqlException ex)
            {
                MessageBox.Show(ex.Message);
            }
            ReloadChildTableView();
        }

        private void ReloadChildTableView()
        {
            if (tableData.Tables[getChildTableName()] != null)
            {
                tableData.Tables[getChildTableName()].Clear();
            }
            daChild.Fill(tableData, getChildTableName());
            childTableView.DataSource = bsChild;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            connection = new SqlConnection(String.Format(getConnectionString(), getDatabase()));
            connection.Open();

            tableData = new DataSet();

            daParent = new SqlDataAdapter(getParentSelectQuery(), connection);
            daChild = new SqlDataAdapter(getChildSelectQuery(), connection);

            daParent.Fill(tableData, getParentTableName());
            daChild.Fill(tableData, getChildTableName());

            parentTableView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            childTableView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            DataColumn referenceKeyColumn = tableData.Tables[getParentTableName()].Columns[getParentReferencedKey()];
            DataColumn foreignKeyColumn = tableData.Tables[getChildTableName()].Columns[getChildForeignKey()];
            drParentChild = new DataRelation("parentChild", referenceKeyColumn, foreignKeyColumn);
            tableData.Relations.Add(drParentChild);

            bsParent = new BindingSource();
            bsChild = new BindingSource();

            bsParent.DataSource = tableData;
            bsParent.DataMember = getParentTableName();

            bsChild.DataSource = bsParent;
            bsChild.DataMember = "parentChild";

            parentTableView.DataSource = bsParent;
        }
    }
}
