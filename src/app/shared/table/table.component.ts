import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {faEllipsis, faLock} from "@fortawesome/free-solid-svg-icons";
import {Page} from "./Model";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ContentChild('headerActions') headerActions!: TemplateRef<any>;
  @ContentChild('rowActions') rowActions!: TemplateRef<any>;
  @ContentChild('customRows') customRows!: TemplateRef<any>;
  @ContentChild('ngx-datatable-cell-template') testRows!: TemplateRef<any>
  rows: any[]
  additionalSettings: any
  page = new Page();

  // @Input() rows: any[]
  @Input() columns: any[];
  // pageIndex: number = 0;
  @Input() pageSize: number;
  totalRecords: number;
  @Input() settings: {
    actionable: false,
    downloadable: false,
  }

  allSelected: any[] = []
  @Input()
  tableService: any


  @Output()
  onSelectAll = new EventEmitter<any[]>();


  defaultSettings = {}
  updatedColumn: any[]
  checkable: boolean = true;
  singleAction: Boolean = true
  protected readonly faEllipsis = faEllipsis;
  protected readonly faLock = faLock;

  constructor() {
    this.page.pageNumber = 1;
    this.page.limit = 3;
  }


  handleSelections() {
    this.onSelectAll.emit(this.allSelected);
  }

  setPage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.page.limit = pageInfo.limit

    this.page.search = {}
    this.tableService.getListData(this.page).subscribe((data: any) => {
      this.page.totalElements = data.totalRecords
      this.rows = data.data
    })


    //when page changes I want to unselect all selected rows
    this.emitSelected([])
    const headerCheckbox: HTMLElement | any | null = document.getElementById("header-check")
    if (headerCheckbox?.checked) headerCheckbox?.click()
  }

  ngOnInit(): void {
    this.setPage({offset: 0, limit: 3});
    // this.columns.push({name: "Actions"});
    this.updatedColumn = this.columns
  }


  onSelectRed(row: any) {
    console.log(row)
  }

  onSelectBlue(value: any) {
    console.log(value)
  }

  handleTest(row: any) {

  }

  toggleRowSelection({target}: any) {
    const selectAllRows = document.querySelectorAll('.my-rows')
    if (target.checked) {
      this.allSelected = []
      selectAllRows.forEach((el: any) => el.checked = true);
      this.allSelected.push(...this.rows)
      this.emitSelected(this.allSelected)
    } else {
      selectAllRows.forEach((el: any) => el.checked = false)
      this.allSelected = []
      this.emitSelected([])
    }
  }

  handleSelection(row: any, {target}: any) {
    if (target.checked) {
      this.allSelected.push(row)
      this.emitSelected(this.allSelected)
    } else {
      this.allSelected = this.allSelected.filter((val) => val.id !== row.id)
      this.emitSelected(this.allSelected)
    }
    this.handleHeaderUnselect()
  }

  handleHeaderUnselect() {
    const headerCheckbox: HTMLElement | any = document.getElementById("header-check")
    //This method checks for all selections to update toogle all checkbox when no selection is made
    const selectAllRows = document.querySelectorAll('.my-rows')
    const checkSelection = Array.from(selectAllRows).every((val: any) => val.checked === false)
    const checkSelectionSome = Array.from(selectAllRows).some((val: any) => val.checked === true)

    if (checkSelection) headerCheckbox.checked = false;
    if (checkSelectionSome) headerCheckbox.checked = true

  }

  emitSelected(rowVal: any) {

    this.onSelectAll.emit(rowVal);
  }
}
